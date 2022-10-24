const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { schemaOption } = require("./schemaOption");

const productCategory = new Schema(
    {
        name: { type: String },
        desc: { type: String },
    },
    schemaOption
);

module.exports = mongoose.model("ProductCategory", productCategory);
