const express = require("express");
const router = express.Router();

router.use("/admin", require("./admin"))
router.use("/comment", require("./comment"))
router.use("/product", require("./product"))
router.use("/productcategory", require("./productCategory"))
router.use("/productdiscount", require("./productDiscount"))
router.use("/productvaritation", require("./productVaritation"))
router.use("/order", require("./order"))
router.use("/user", require("./user"))
router.use("/", require("./login"))


module.exports = router;