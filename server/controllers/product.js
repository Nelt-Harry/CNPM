const stream = require('stream');
const { google } = require("googleapis")
const { oauth2Client } = require("../configuration/googleDrive")
const { Product } = require("../models");

exports.create = async (req, res) => {
    try {
        const imageIds = await uploadImage(req.files)
        console.log(imageIds)
        const newProduct = new Product({
            ...req.body,
            images: imageIds
        });
        const savedProduct = await newProduct.save();

        res.status(201).json(imageIds);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
exports.getAll = async (req, res) => {
    console.log(req.params)
    try {
        const list = await Product.find().
            populate({ path: "category" }).
            populate({ path: "discount" }).
            populate({ path: "varitation" }).
            sort("-createAt");
        res.status(200).json(list);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.getOne = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.
            findOne({ id, state: "active" }).
            populate({ path: "category" }).
            populate({ path: "discount" }).
            populate({ path: "varitation" }).exec()

        res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.update = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findOne({ id })
        if (!product) res.json("Product not found")

        const { newProductImages } = req.body
        const different = product.images.filter(element => !newProductImages.includes(element))
        await deleteImage(different)

        const uploadImageIds = await uploadImage(req.files)

        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
            images: [...req.body.images, ...uploadImageIds]
        });

        res.status(200).json(updateProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({ id })
        if (!product) res.json("Product not found")

        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
            state: "inactive"
        });

        res.status(200).json(updateProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const uploadFile = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    return await google.drive({ version: 'v3', auth: oauth2Client }).files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
        },
        requestBody: {
            name: fileObject.originalname,
            parents: ["1N8xTfb2E4eRKyzV35IHQeKX4ZwfWyTwr"],
        },
        fields: 'id,name',
    })
};


const deleteFile = async (fileId) => {
    google.drive({ version: 'v3', auth: oauth2Client }).files.delete({
        fileId
    })
}

const deleteImage = async (files) => {
    try {
        for (let f = 0; f < files.length; f += 1) {
            await deleteFile(files[f]);
        }
        return true
    } catch (err) {
        return null
    }
}

const uploadImage = async (files) => {
    var idImages = []
    for (let f = 0; f < files.length; f += 1) {
        const { data } = await uploadFile(files[f]);
        idImages.push(data.id)
    }
    return idImages

};
