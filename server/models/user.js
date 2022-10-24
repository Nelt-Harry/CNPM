const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { schemaOption } = require("./schemaOption");

const user = new Schema(
    {
        login: { type: Schema.Types.ObjectId, ref: "UserLogin" },
        name: { type: String },
        address: { type: Array },
        phone: { type: String },
        bought: { type: Array }
    },
    schemaOption
);
module.exports = mongoose.model("User", user);
