const { generateToken } = require("../../handlers/token")
const { UserLogin, User } = require("../../models")
const { oauth2Client } = require("../../configuration/googleDrive")

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
exports.googleLogin = async (req, res) => {
    const { email } = req.user.google
    const newUserLogin = await UserLogin.findOne({ "google.email": email })

    if (!newUserLogin) return res.status(500).json("not found")

    let newUser = await User.findOne({ login: newUserLogin._id })
    if (newUser) return res.status(200)

    newUser = createUser(newUserLogin._id)
    newUser.save()

    console.log(newUserLogin)
    generateToken({ email }).then((data) => res.json(data))
}
exports.setCredentital = async (req, res) => {
    console.log("set up credentital")
    if (!oauth2Client.credentials.access_token) {
        oauth2Client.setCredentials({ 'access_token': req.user.google.token })
    }
    res.redirect('/api/profile');
}