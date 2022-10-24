const express = require("express");
const { productController } = require("../controllers")
const imageRouter = require("./image")
const tokenHandler = require("../handlers/token")
const multer = require("multer")
const upload = multer()

const router = express.Router();

router.get("/:id", productController.getOne);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);
router.post("/", upload.any(), productController.create);
router.get("/", productController.getAll);
router.use("/image", imageRouter)

module.exports = router;