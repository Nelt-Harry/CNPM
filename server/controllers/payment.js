const { PaymentDetail } = require("../models");

exports.create = async (req, res) => {
    try {
        const newPaymentDetail = new PaymentDetail(req.body)
        const savedPaymentDetail = await newPaymentDetail.save()

        res.status(200).json(savedPaymentDetail);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const paymentDetail = await PaymentDetail.findOne({ id })
        if (!paymentDetail) res.json("payment detail not found")

        const updatepaymentDetail = await PaymentDetail.findOneAndUpdate({ id }, {
            $set: req.body,
        }, { new: true });

        res.status(200).json(updatepaymentDetail);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};


exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await PaymentDetail.findByIdAndDelete(id);

        res.status(200).json("Deleted");
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

