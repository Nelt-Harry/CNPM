const { Comment } = require("../models");

exports.create = async (req, res) => {
    const { userId, payload } = req.body;
    try {
        const newComment = new Comment({
            user: userId,
            product: req.params.productId,
            payload: payload,
        })

        const savedComment = await newComment.save()

        res.status(200).json(savedComment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.getByProductId = async (req, res) => {
    const id = req.params.productId
    try {
        const comments = Comment.find({ productId: id }).populate("user")
        const newList = comments.map((comment) => {
            const {
                user,
                payload
            } = comment;
            const userId = user._id;
            return {
                payload,
                user: {
                    userId,
                },
            };
        });
        res.status(200).json(newList);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}