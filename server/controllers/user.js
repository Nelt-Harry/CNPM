const { User, VerifyUser } = require("../models");
const { generateHash } = require("../handlers/hashpassword")
const { generateToken } = require("../handlers/token")
const { sendingEmail } = require("../helper/nodemailer")

exports.update = async (req, res) => {
    const { id } = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(id, {
            $set: req.body,
        });

        res.status(200).json(updateUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.getById = async (req, res) => {
    const { id } = req.body;
    try {
        const newUser = await User.findById(id)
        if (!newUser) return res.json("User not found")

        res.json(newUser)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.verify = async (req, res) => {
    const oneTimePassword = Math.floor(Math.random() * 100000).toString()
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(401).json("User not found")

        const verifyUser = await VerifyUser.findOne({ email })
        if (verifyUser) {
            VerifyUser.findOneAndUpdate({ email: email }, {
                ...verifyUser,
                OTP: generateHash(oneTimePassword)
            })
        }
        const newVerifyUser = new VerifyUser({
            email,
            OTP: generateHash(oneTimePassword)
        });
        sendingEmail(email, oneTimePassword)
        const saved = await newVerifyUser.save()
        res.status(200).json(saved)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.authorize = async (req, res) => {
    const { email, OTP } = req.body
    try {
        const newVerifyUser = VerifyUser.findOne({ email })
        if (!newVerifyUser || !validPassword(OTP))
            return res.json("wrong OTP")

        await VerifyUser.findOneAndDelete({ email })
        generateToken({ email }).then((data) => res.json(data))

        res.status(200).json("OTP success")
    } catch (err) {
        res.status(500).json(err)
    }
}