const express = require("express");
const { productCategoryController } = require("../controllers")
const router = express.Router();


router.post("/", productCategoryController.create);
router.get("/", productCategoryController.getAll);
router.put("/:id", productCategoryController.update);
router.delete("/:id", productCategoryController.delete);

module.exports = router;
