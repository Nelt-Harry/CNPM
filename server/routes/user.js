const router = require("express").Router();
const tokenHandler = require("../handlers/token");
const { userController } = require("../controllers");

router.post("/", tokenHandler.verifyToken, userController.update);
router.post("/verify", userController.verify)
router.post("/author", userController.authorize)

module.exports = router;