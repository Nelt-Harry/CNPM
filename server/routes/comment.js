const express = require("express");
const { commentController } = require("../controllers")
const router = express.Router();

router.post("/:productId", commentController.create)
router.get("/:productId", commentController.getByProductId)

module.exports = router;