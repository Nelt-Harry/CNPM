const express = require("express");
const { orderController } = require("../controllers")
const tokenHandler = require("../handlers/token")
const router = express.Router();

router.get("/", tokenHandler.verifyAdminToken, orderController.getAll)
router.get("/:userId", orderController.getByUserId)
router.put("/", orderController.update)

module.exports = router;