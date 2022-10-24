const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema({
    name: { type: String },
    desc: { type: String },
    stock: { type: Number, require: true },
    price: { type: Number },
    star: { type: Number, default: 0 },
    boughtCount: { type: Number, default: 0 },
    images: { type: Array },
    varitation: {
        type: Schema.Types.ObjectId,
        ref: "ProductVaritation"
    },
    discount: {
        type: Schema.Types.ObjectId,
        ref: "ProductDiscount",
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "ProductCategory",
    },
    createdAt: { type: Date },
    state: { type: String, deault: "active" }
});

module.exports = mongoose.model("Product", product);
