const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { schemaOption } = require("./schemaOption");

const paymentDetail = new Schema(
    {
        order: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            require: true,
        },
        total: {
            type: Number,
        },
        provider: {
            type: String,
        },
        status: {
            type: String,
            default: "PENDING",
        },
    },
    schemaOption
);
module.exports = mongoose.model("PaymentDetail", paymentDetail);
