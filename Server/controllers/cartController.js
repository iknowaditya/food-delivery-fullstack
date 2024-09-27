const userModel = require('../models/userModel')


// addItem to user cart
const addToCart = async (req, res) => {
    try{
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;

        if(!cartData[req.body.itemId]){

            cartData[req.body.itemId] = 1
        }else{

            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})

        res.json({
            success: true,
            message: "Item added to cart successfully"
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


// remove item from user cart
const removeFromCart = async (req, res) => {
    try{
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;

        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.json({
            success: true,
            message: "Item removed from cart successfully"
        })
        
    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


// get user cartdata..
const getCartData = async (req, res) => {
    try{
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        res.json({
            success: true,
            data: userData.cartData
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// remove all items from cart
const clearCart = async (req, res) => {
    try{
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        cartData = {}
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.json({
            success: true,
            message: "Cart cleared successfully"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


module.exports = { addToCart, removeFromCart, getCartData, clearCart }