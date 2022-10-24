const CryptoJS = require("crypto-js")

exports.generateHash = function (password) {
    const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET_KEY
    )
    return encryptedPassword
};
