const path = require("path")
const nodemailer = require("nodemailer")
const hbs = require("nodemailer-express-handlebars")
var smtpTransport = require('nodemailer-smtp-transport');

var smtpTransport = nodemailer.createTransport(smtpTransport({
    host: 'smtp-mail.outlook.com',
    auth: {
        user: process.env.USERNAME_NODEMAILER,
        pass: process.env.PASSWORD_NODEMAILER
    },
}));


const handlebarOptions = {
    viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve('./views'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views'),
    extName: ".handlebars",
}

smtpTransport.use('compile', hbs(handlebarOptions));

exports.sendingEmail = (receiver, otp, link = null) => {
    const options = {
        from: "node_cnpm_19@outlook.com",
        to: receiver,
        subject: "Shop reset password",
        template: 'resetPass',
        context: {
            otp,
            link,
        }
    }
    smtpTransport.sendMail(options, (err, info) => {
        if (err) return console.log(err)
        console.log(info.response)
    })
}