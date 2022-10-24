const { ProductVaritation, Product } = require("../models");

exports.create = async (req, res) => {
    try {
        const newProductVaritation = new ProductVaritation(req.body)
        const savedProductVaritation = await newProductVaritation.save()

        res.status(200).json(savedProductVaritation);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const productVaritation = await ProductVaritation.findOne({ id })
        if (!productVaritation) res.status("401").json("Product Varitation not found")

        const updateProductVaritation = await ProductVaritation.findOneAndUpdate({ id }, {
            $set: req.body,
        }, { new: true });

        res.status(200).json(updateProductVaritation);
    } catch (err) {

        console.log(err);
        res.status(500).json(err);
    }
};


exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const products = Product.find({ varitation: id })
        if (products.length) res.json("Can't delete")

        await ProductVaritation.findByIdAndDelete(id);

        res.status(200).json("Deleted");
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
