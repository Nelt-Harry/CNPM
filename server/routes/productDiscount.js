const express = require("express");
const { productDiscountController } = require("../controllers")
const router = express.Router();


router.post("/", productDiscountController.create);
router.put("/:id", productDiscountController.update);
router.delete("/:id", productDiscountController.delete);

module.exports = router;
