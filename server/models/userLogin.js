const CryptoJS = require("crypto-js")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userLogin = new Schema(
    {
        local: {
            email: String,
            password: String
        },
        facebook: {
            id: String,
            token: String,
            email: String,
            name: String,
            refreshToken: String
        },
        google: {
            id: String,
            token: String,
            email: String,
            name: String,
            refreshToken: String
        }
    }
);
userLogin.methods.generateHash = function (password) {
    const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET_KEY
    )
    return encryptedPassword
};

userLogin.methods.validPassword = function (password) {
    const decryptedPass = CryptoJS.AES.decrypt(
        this.local.password,
        process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    return decryptedPass == password
};
module.exports = mongoose.model("UserLogin", userLogin);
