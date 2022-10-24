const { ProductDiscount, Product } = require("../models");


exports.getAll = async (req, res) => {
    try {
        const productCategories = ProductDiscount.find({})

        res.status(200).json(productCategories);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.create = async (req, res) => {
    try {
        const newProductDiscount = new ProductDiscount(req.body)
        const savedProductDiscount = await newProductDiscount.save()

        res.status(200).json(savedProductDiscount);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const productDiscount = await ProductDiscount.findOne({ id })
        if (!productDiscount) res.status("401").json("Product Discount not found")

        const updateProductDiscount = await ProductDiscount.findOneAndUpdate({ id }, {
            $set: req.body,
        }, { new: true });

        res.status(200).json(updateProductDiscount);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};


exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const products = Product.find({ discount: id })
        if (products.length) res.json("Can't delete")

        await ProductDiscount.findByIdAndDelete(id);

        res.status(200).json("Deleted");
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
