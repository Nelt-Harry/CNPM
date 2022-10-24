const express = require("express");
const passport = require("passport");
const { loginController } = require("../controllers")
// const { UploadImage } = require("../configuration/googleDrive/upload")

const router = express.Router();

router.get('/', function (req, res) {
    res.render('index.ejs'); // load the index.ejs file
});
router.get('/login', function (req, res) {
    res.render('login.ejs');
});
router.get('/signup', function (req, res) {
    res.render('signup.ejs');
});
router.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile.ejs', { success: true });
});



router.get("/auth/facebook",
    passport.authenticate("facebook", { scope: "email" }),
    loginController.facebook.facebookLogin);

router.get('/auth/google',
    passport.authenticate('google', {
        scope: [
            'profile',
            'email',
            'https://www.googleapis.com/auth/contacts.readonly',
            "https://www.googleapis.com/auth/drive.file",
        ],
        accessType: 'offline', approvalPrompt: 'force'
    }),
    loginController.google.googleLogin);

router.get("/auth/facebook/callback", passport.authenticate("facebook"));
router.get('/auth/google/callback',
    passport.authenticate('google', {
    }), loginController.google.setCredentital);

router.post("/login",
    passport.authenticate("local-login",),
    loginController.local.localLogin);

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/api');
    });
});
router.post("/signup",
    passport.authenticate("local-signup"),
    loginController.local.localSignUp);

// route middleware để kiểm tra một user đã đăng nhập hay chưa?
function isLoggedIn(req, res, next) {
    // Nếu một user đã xác thực, cho đi tiếp
    if (req.isAuthenticated())
        return next();
    // Nếu chưa, đưa về trang chủ
    res.redirect('/');
}

module.exports = router;
