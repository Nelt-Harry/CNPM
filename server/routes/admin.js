const express = require("express");
const router = express.Router();
const tokenHandler = require("../handlers/token");
const { adminController } = require("../controllers");

router.post("/login", adminController.login);
router.post("/check-token", tokenHandler.verifyToken, (req, res) => {
    res.status(200).json("Authorized");
});

module.exports = router;