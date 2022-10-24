const mongoose = require("mongoose");
const CryptoJS = require("crypto-js")
const Schema = mongoose.Schema;

const verifyUser = new Schema(
    {
        email: {
            type: String,
        },
        OTP: { type: String },
        state: {
            type: String,
            required: true,
            default: "PENDING",
        },
        createdAt: { type: Date, expires: 300 }
    },
);
verifyUser.methods.generateHash = function (password) {
    const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET_KEY
    )
    return encryptedPassword
};

verifyUser.methods.validPassword = function (password) {
    const decryptedPass = CryptoJS.AES.decrypt(
        this.OTP,
        process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    return decryptedPass == password
};
module.exports = mongoose.model("VerifyUser", verifyUser);
