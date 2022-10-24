const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { schemaOption } = require("./schemaOption");

const order = new Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            requied: true,
        },
        lineItem: {
            type: mongoose.Schema.Types.Mixed,
        },
        state: {
            type: String,
            required: true,
            default: "PENDING",
        },
    },
    { schemaOption }
);

module.exports = mongoose.model("Order", order);
