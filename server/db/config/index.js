const mongoose = require("mongoose");
const seedAdmin = require("../../seed/Admin")

async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/FinalProject", {
            useNewUrlParser: true,
        });
        console.log("connect successfully");
        seedAdmin.createAdmin()
    } catch (error) {
        console.log("connect fail");
    }
}
module.exports = { connect };
