import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8 text-green-600"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 17v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" />
    <polyline points="16 11 12 7 8 11" />
    <line x1="12" y1="7" x2="12" y2="20" />
  </svg>
);

const CloseIcon = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-red-600 cursor-pointer absolute top-0 right-0 m-2"
    viewBox="0 0 24 24"
    onClick={onClick}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 6L6 18M6 6l12 12"
    />
  </svg>
);

const Add = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null); // Store the actual file
  const [data, setData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Salad',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', Number(data.price));
    formData.append('description', data.description);
    formData.append('category', data.category);

    if (file) {
      formData.append('image', file); // Send the actual file
    }

    try {
      const response = await axios.post('/api/food/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        // Reset form fields
        setData({
          name: '',
          price: '',
          description: '',
          category: 'Salad',
        });
        setImage(null);
        setFile(null); // Reset file

        // Display success toast
        toast.success('Product added successfully!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to add the product!');
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile)); // Preview image
      setFile(selectedFile); // Save the actual file
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setFile(null); // Clear the image file
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Add New Product | Admin';

  }, []);

  return (
    <div className="flex flex-col h-full overflow-y-auto p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Product</h2>
      <form className="space-y-4" onSubmit={onSubmitHandler}>
        <div className="flex flex-col items-center">
          <p className="text-lg font-medium mb-2 flex items-center">
            <UploadIcon />
            <span className="ml-2">Upload Image</span>
          </p>
          <label className="cursor-pointer border-2 border-green-600 rounded-md p-2 flex items-center justify-center w-full md:w-[300px] relative">
            {image ? (
              <>
                <img src={image} alt="Preview" className="h-24 object-cover rounded-md" />
                <CloseIcon onClick={handleImageRemove} />
              </>
            ) : (
              <span className="text-gray-600">Select an image</span>
            )}
            <input
              type="file"
              id="image"
              hidden
              required
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-green-600"
            required
            value={data.name}
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Description</label>
          <textarea
            name="description"
            rows="6"
            placeholder="Write content here"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-green-600"
            required
            value={data.description}
            onChange={onChangeHandler}
          ></textarea>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Product Category</label>
            <select
              name="category"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-green-600"
              required
              value={data.category} // Bind the category value
              onChange={onChangeHandler}
            >

              <option value="Pizza">Pizza</option>
              <option value="Food">Food</option>
              <option value="Salad">Salad</option>
              <option value="Dosa">Dosa</option>
              <option value="Samosa">Samosa</option>
              <option value="Biryani">Biryani</option>
              <option value="Rolls">Rolls</option>
              <option value="Bread">Bread</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Product Price</label>
            <input
              type="number"
              name="price"
              placeholder="$20"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-green-600"
              required
              value={data.price}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
