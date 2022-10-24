const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { schemaOption } = require("./schemaOption");

const productVaritation = new Schema(
    {
        name: { type: String },
        variants: { type: Schema.Types.Array },
    },
    schemaOption
);
module.exports = mongoose.model("ProductVaritation", productVaritation);
