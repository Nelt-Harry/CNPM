const express = require("express");
const { productVaritationController } = require("../controllers")
const router = express.Router();


router.post("/:id", productVaritationController.update);
router.delete("/:id", productVaritationController.delete);
router.post("/", productVaritationController.create);

module.exports = router;
