const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

router.route("/products").get(productController.productsList).post(productController.createProduct);

module.exports = router;
