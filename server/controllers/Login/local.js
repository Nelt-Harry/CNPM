const { generateToken } = require("../../handlers/token")
const { UserLogin, User } = require("../../models")

const createUser = (id) => {
    const newUser = new User({
        login: id,
        name: "",
        address: [],
        phone: "",
        bought: []
    })
    return newUser
}

exports.localLogin = async (req, res) => {
    const { email } = req.user.local

    generateToken({ email }).then((data) => res.status(200).json(data))
}

exports.localSignUp = async (req, res) => {
    const { email } = req.user.local
    const newUserLogin = await UserLogin.findOne({ "local.email": email })

    if (!newUserLogin) return res.status(500).json("not found")

    let newUser = await User.findOne({ login: newUserLogin._id })
    if (newUser) return res.status(200)

    newUser = createUser(newUserLogin._id)
    newUser.save()
    generateToken({ email }).then((data) => res.json(data))
}