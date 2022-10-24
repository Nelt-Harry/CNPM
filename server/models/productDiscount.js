const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { schemaOption } = require("./schemaOption");

const productDiscount = new Schema(
    {
        name: { type: String },
        discountPercent: { type: Number },
        active: { type: Boolean },
    },
    schemaOption
);

module.exports = mongoose.model("ProductDiscount", productDiscount);
