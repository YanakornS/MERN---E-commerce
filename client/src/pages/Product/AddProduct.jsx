import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import ProductService from "../../services/product.service";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
    category: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setProduct({ ...product, [name]: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบว่ากรอกข้อมูลครบหรือไม่
    if (
      !product.name ||
      !product.description ||
      !product.image ||
      !product.price ||
      !product.category
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all required fields before submitting.",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("file", product.image); // Backend ต้องรองรับ 'file'
    formData.append("price", product.price);
    formData.append("category", product.category);

    try {
      await ProductService.addProduct(formData);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product has been added successfully!",
      });

      navigate("/DashboardLayout");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error adding the product. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-8 border  border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Add Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">
            Product Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            value={product.name}
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            required
            className="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            value={product.description}
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block font-medium text-gray-700">
            Price (THB):
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            min="0"
            className="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            value={product.price}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block font-medium text-gray-700">
            Upload Product Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            required
            accept="image/*"
            className="mt-1 p-2 w-full border rounded-md shadow-sm file:bg-blue-50 file:border-none file:rounded-md file:text-blue-700 file:px-4 file:py-2 cursor-pointer"
            onChange={handleChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-full h-48 object-cover rounded-lg border border-gray-300"
            />
          )}
        </div>

        {/* Category Dropdown */}
        <div>
          <label htmlFor="category" className="block font-medium text-gray-700">
            Category:
          </label>
          <select
            name="category"
            required
            className="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            value={product.category}
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
            <option value="electronics">Gadgets</option>
            <option value="electronics">Swag</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline`}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
