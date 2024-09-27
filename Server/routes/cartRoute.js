const express = require("express");
const authMiddleware = require("../middlewares/auth");
const { addToCart, removeFromCart, getCartData, clearCart } = require("../controllers/cartController");

const cartRouter = express.Router();

cartRouter.post("/addCart", authMiddleware, addToCart);
cartRouter.post("/removeCart", authMiddleware, removeFromCart); 
cartRouter.post("/getCart", authMiddleware, getCartData);
cartRouter.post("/clearCart", authMiddleware, clearCart);



module.exports = cartRouter