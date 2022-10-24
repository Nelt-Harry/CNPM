const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const { UserLogin } = require('../models');

module.exports = function (passport) {
	// passport session setup
	// serialize: determines which data of the user object should be stored in the session
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});
	passport.deserializeUser(function (id, done) {
		UserLogin.findById(id, function (err, user) {
			done(err, user);
		});
	});

	// LOCAL SIGNUP
	passport.use('local-signup', new LocalStrategy({
		// mặc định local strategy sử dụng username và password,
		// chúng ta cần cấu hình lại
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
		function (req, email, password, done) {
			// asynchronous
			// Hàm callback của nextTick chỉ được thực hiện khi hàm trên nó trong stack (LIFO) được thực hiện
			// UserLogin.findOne sẽ không được gọi cho tới khi dữ liệu được gửi lại
			process.nextTick(function () {
				UserLogin.findOne({ 'local.email': email }, function (err, user) {
					if (err) return done(err);

					if (user) {
						return done(null, false);
					} else {
						const newUserLogin = new UserLogin();
						newUserLogin.local.email = email;
						newUserLogin.local.password = newUserLogin.generateHash(password);

						newUserLogin.save(function (err) {
							if (err)
								throw err;
							return done(null, newUserLogin);
						});
					}
				});
			});
		}));

	// LOCAL LOGIN
	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
		function (req, email, password, done) {
			// find a user whose email is the same as the forms email
			// we are checking to see if the user trying to login already exists
			UserLogin.findOne({ 'local.email': email }, function (err, user) {
				if (err) return done(err);
				if (!user || !user.validPassword(password))
					return done(null, false);
				return done(null, user);
			});
		})
	);

	// FACEBOOK 
	passport.use(new FacebookStrategy({
		clientID: process.env.FACEBOOK_KEY,
		clientSecret: process.env.FACEBOOK_SECRET_KEY,
		callbackURL: process.env.FACEBOOK_CALLBACK_URL,
		profileFields: [
			'id',
			'displayName',
			'email',
			'first_name',
			'last_name',
			'middle_name'
		]
	},

		function (token, refreshToken, profile, done) {
			// asynchronous
			process.nextTick(function () {
				UserLogin.findOne({ 'facebook.id': profile.id }, function (err, user) {
					if (err) return done(err);

					if (user) {
						const userLogin = new UserLogin({
							...user,
							'facebook.token': token
						})
						userLogin.save((err) => {
							if (err) throw err;
							return done(null, userLogin)
						})
					} else {
						const newUserLogin = new UserLogin();
						// console.log(profile)
						newUserLogin.facebook.id = profile.id;
						newUserLogin.facebook.token = token;
						newUserLogin.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // bạn có thể log đối tượng profile để xem cấu trúc
						newUserLogin.facebook.email = profile.emails[0].value; // fb có thể trả lại nhiều email, chúng ta lấy cái đầu tiền

						newUserLogin.save(function (err) {
							if (err)
								throw err;
							return done(null, newUserLogin);
						});
					}
				});
			});
		}));

	// GOOGLE
	passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_KEY,
		clientSecret: process.env.GOOGLE_SECRET_KEY,
		callbackURL: process.env.GOOGLE_CALLBACK_URL,
	},
		function (token, refreshToken, profile, done) {
			process.nextTick(function () {
				UserLogin.findOne({ 'google.id': profile.id }, function (err, user) {
					if (err) return done(err);
					if (user) {
						const userLogin = new UserLogin({
							...user,
							'google.token': token
						})
						userLogin.save((err) => {
							if (err) throw err;
							return done(null, userLogin)
						})
					} else {
						const newUserLogin = new UserLogin();
						newUserLogin.google.id = profile.id;
						newUserLogin.google.token = token;
						newUserLogin.google.refreshToken = refreshToken;
						newUserLogin.google.name = profile.displayName;
						newUserLogin.google.email = profile.emails[0].value; // pull the first email

						newUserLogin.save(function (err) {
							if (err)
								throw err;
							console.log(newUserLogin)
							return done(null, newUserLogin);
						});
					}
				});
			});
		}));
};