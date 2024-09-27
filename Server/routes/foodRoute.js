const express = require("express");
const multer = require('multer');
const { addFood, foodList, removeFood } = require("../controllers/foodControllers");

const foodRouter = express.Router();

// image storage 
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} ${file.originalname}`)
    }
})

const upload = multer({ storage: storage })


foodRouter.post('/add', upload.single("image"), addFood)
foodRouter.get("/list", foodList)
foodRouter.delete("/remove/:id", removeFood)                 




module.exports = foodRouter