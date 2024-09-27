const express = require("express");
const { placeOrder, verifyOrder, userOrders, listAllOrders, updateOrderStatus } = require("../controllers/orderController");
const authMiddleware = require("../middlewares/auth");

const orderRouter = express.Router();



orderRouter.post("/placeOrder", authMiddleware, placeOrder);
orderRouter.post("/verifyOrder", verifyOrder);
orderRouter.post("/userOrders", authMiddleware, userOrders);
orderRouter.get("/listAllOrders", listAllOrders);
orderRouter.post("/updateOrderStatus", updateOrderStatus);



module.exports = orderRouter