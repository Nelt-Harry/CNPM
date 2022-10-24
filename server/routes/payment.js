const express = require("express");
const { paymentDetailController } = require("../controllers")
const router = express.Router();


router.post("/", paymentDetailController.create);
router.put("/:id", paymentDetailController.update);
router.delete("/:id", paymentDetailController.delete);

module.exports = router;