const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const Stripe = require('stripe');
require('dotenv').config(); // Load environment variables from .env

// Initialize Stripe with the secret key from environment variables
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Place user order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = process.env.FRONTEND_URL;
    
    try {
        // Create a new order
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
        });

        // Save the order to the database
        await newOrder.save();
        
        // Clear the user's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Create line items for Stripe
        const lineItems = req.body.items.map(item => ({
            price_data: {
                currency: "USD",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, 
            },
            quantity: item.quantity,
        }));

        // Add delivery charge as a line item
        lineItems.push({
            price_data: {
                currency: "USD",
                product_data: {
                    name: "Delivery Charge",
                },
                unit_amount: req.body.amount + 2,
            },
            quantity: 1,
        });

        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&OrderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&OrderId=${newOrder._id}`,
        });

        // Send session URL back to frontend
        res.json({
            success: true,
            session_url: session.url,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const verifyOrder = async (req, res) => {
    const { success, OrderId } = req.body;

    try {
        if (success == "true") { 
            await orderModel.findByIdAndUpdate(OrderId, { payment: "true" });

            res.json({
                success: true,
                message: "Order placed successfully",
            });
}else{
    await orderModel.findByIdAndDelete(OrderId);

    res.json({
        success: false,
        message: "Order failed",
}
    );
}
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }

};


// users order for frontend.
const userOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({
            success: true,
            data: orders
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

// listing all orders for admin page..
const listAllOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({});
        res.json({
            success: true,
            data: orders
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
    }

    //text API for updating order status..
    const updateOrderStatus = async (req, res) => {
        try{
            const order = await orderModel.findByIdAndUpdate(req.body.orderId, {
                status: req.body.status});
            res.json({
                success: true,
                message: "Order status updated successfully",
            })
        }catch(err){
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

module.exports = { placeOrder, verifyOrder, userOrders, listAllOrders, updateOrderStatus };
