const foodModel = require("../models/foodModel");
const fs = require("fs");

// add food item..
const addFood = async (req, res) => {
    const image_filename = req.file.filename;
    const newFood = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await newFood.save();
        res.json({
            success: true,
            message: "Food item added successfully"
        }); // Use res.json() for a JSON response
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


// all food list..
const foodList = async (req, res) => {
    try {
        const food = await foodModel.find({});
        res.json({
            success: true,
            data: food
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}



// remove food item
const removeFood = async (req, res) => {
    try {
        // Find the food item by its ID from the URL parameter
        const food = await foodModel.findById(req.params.id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food item not found"
            });
        }

        // Remove the image from the file system
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.error("Error removing file:", err);
            }
        });

        // Delete the food item from the database
        await foodModel.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Food item removed successfully"
        });
    } catch (err) {
        console.error("Error removing food item:", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};






module.exports = {
    addFood,
    foodList,
    removeFood
}