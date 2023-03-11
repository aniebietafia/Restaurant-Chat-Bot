const Product = require("../models/product.models");

const productsList = async (req, res, next) => {
  res.status(200).json(products);
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
  productsList,
  placeOrder,
  orderCheckout,
  orderHistory,
  cancelOrder,
};
