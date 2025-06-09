import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Upload,
  X,
  PlusCircle,
  DollarSign,
  Type,
  AlignLeft,
  ChevronDown,
} from "lucide-react";

const Add = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Salad",
  });

  const categories = [
    "Pizza",
    "Dosa",
    "Noodles",
    "Burger",
    "Yamm Yamm",
    "Biryani",
    "Rolls",
    "Salad",
  ];

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        // 2MB limit
        toast.error("Image size should be less than 2MB");
        return;
      }
      setImage(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setFile(null);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    if (!file) {
      toast.error("Please select an image file!");
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", Number(data.price));
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("image", file);

    try {
      const response = await axios.post("/api/food/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setData({
          name: "",
          price: "",
          description: "",
          category: "Salad",
        });
        setImage(null);
        setFile(null);
        toast.success("Product added successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to add the product!"
      );
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Add New Product | Admin";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-6 bg-gradient-to-b from-[#f8fafb] to-white"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-[#99f2c8]/30 overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-[#1f4037] to-[#99f2c8] p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center">
            <PlusCircle className="w-6 h-6 mr-3" />
            Add New Product
          </h2>
          <p className="text-sm text-white/90 mt-1">
            Fill in the details below to add a new menu item
          </p>
        </div>

        {/* Form Content */}
        <form className="p-6 space-y-6" onSubmit={onSubmitHandler}>
          {/* Image Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-[#1f4037]">
              Product Image
            </label>
            <div className="flex flex-col items-center">
              <label className="cursor-pointer w-full">
                {image ? (
                  <div className="relative group">
                    <img
                      src={image}
                      alt="Preview"
                      className="h-48 w-full object-cover rounded-lg border-2 border-[#99f2c8]/50"
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      onClick={handleImageRemove}
                      className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-md"
                    >
                      <X className="w-5 h-5 text-red-500" />
                    </motion.button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-[#99f2c8] rounded-lg p-8 text-center hover:bg-[#99f2c8]/10 transition-colors">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Upload className="w-10 h-10 text-[#1f4037]" />
                      <p className="text-sm text-[#1f4037]">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-[#1f4037]/70">
                        PNG, JPG up to 2MB
                      </p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  id="image"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#1f4037] flex items-center">
              <Type className="w-4 h-4 mr-2" />
              Product Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Margherita Pizza"
              className="w-full border border-[#99f2c8]/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#99f2c8] focus:border-transparent bg-white/90"
              required
              value={data.name}
              onChange={onChangeHandler}
            />
          </div>

          {/* Product Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#1f4037] flex items-center">
              <AlignLeft className="w-4 h-4 mr-2" />
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Describe the product..."
              className="w-full border border-[#99f2c8]/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#99f2c8] focus:border-transparent bg-white/90"
              required
              value={data.description}
              onChange={onChangeHandler}
            />
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Select */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#1f4037]">
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  className="w-full appearance-none border border-[#99f2c8]/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#99f2c8] focus:border-transparent bg-white/90 text-[#1f4037]"
                  required
                  value={data.category}
                  onChange={onChangeHandler}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-[#1f4037]/50 pointer-events-none" />
              </div>
            </div>

            {/* Price Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#1f4037] flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-[#1f4037]">$</span>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full border border-[#99f2c8]/50 rounded-lg p-3 pl-8 focus:outline-none focus:ring-2 focus:ring-[#99f2c8] focus:border-transparent bg-white/90"
                  required
                  value={data.price}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isUploading}
            className={`w-full py-3 rounded-lg font-bold text-white flex items-center justify-center ${
              isUploading
                ? "bg-[#1f4037]/70 cursor-not-allowed"
                : "bg-gradient-to-r from-[#1f4037] to-[#99f2c8] shadow-md hover:shadow-lg"
            }`}
          >
            {isUploading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5 mr-2" />
                Add Product
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default Add;
