const Product = require("../models/product.models");

const createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

const productsList = async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({ products });
};

const placeOrder = (req, res, next) => {
  res.send("Place an order");
};

const orderCheckout = (req, res, next) => {
  res.send("Order Checkout");
};

const orderHistory = (req, res, next) => {
  res.send("Order History");
};

const cancelOrder = (req, res, next) => {
  res.send("Cancel Order");
};

module.exports = {
  createProduct,
  productsList,
  placeOrder,
  orderCheckout,
  orderHistory,
  cancelOrder,
};
