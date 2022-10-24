const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { schemaOption } = require("./schemaOption");

const comment = new Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            requied: true,
        },
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product"
        },
        payload: { type: String }
    },
    { schemaOption }
);

module.exports = mongoose.model("Comment", comment);
