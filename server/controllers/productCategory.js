const { ProductCategory, Product } = require("../models");

exports.getAll = async (req, res) => {
    try {
        const list = await ProductCategory.find({}).sort("-createAt");
        res.status(200).json(list);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.create = async (req, res) => {
    try {
        const newProductCategory = new ProductCategory(req.body)
        const savedProductCategory = await newProductCategory.save()

        res.status(200).json(savedProductCategory);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const productCategory = await ProductCategory.findOne({ id })
        if (!productCategory) res.status("401").json("Product category not found")

        const updateProductCategory = await ProductCategory.findOneAndUpdate({ id }, {
            $set: req.body,
        }, { new: true });

        res.status(200).json(updateProductCategory);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};


exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const products = await Product.find({ category: id })
        if (products.length) res.json("Can't delete")

        await ProductCategory.findByIdAndDelete(id);

        res.status(200).json("Deleted");
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
