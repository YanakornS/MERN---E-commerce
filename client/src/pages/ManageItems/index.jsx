import React, { useEffect, useState } from "react";
import ProductService from "../../services/product.service";
import Swal from "sweetalert2";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State สำหรับหมวดหมู่
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // โหลดข้อมูลสินค้าจาก API
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const response = await ProductService.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // ลบสินค้า
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await ProductService.deleteProduct(id);
        fetchProducts();
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the product.", "error");
      }
    }
  };

  // เปิด Modal สำหรับแก้ไขสินค้า
  const handleEdit = (product) => {
    setEditProduct(product);
    setImagePreview(product.image); // โหลดรูปเดิมมาแสดง
    setSelectedFile(null);
  };

  // อัปโหลดไฟล์รูปภาพใหม่
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // แสดง Preview รูปภาพใหม่ที่อัปโหลด
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // อัปเดตสินค้า
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", editProduct.name);
    formData.append("description", editProduct.description);
    formData.append("price", editProduct.price);
    formData.append("category", editProduct.category);

    if (selectedFile) {
      formData.append("file", selectedFile); // เพิ่มไฟล์ใหม่ถ้ามี
    }

    try {
      await ProductService.updateProduct(editProduct._id, formData);
      setEditProduct(null);
      fetchProducts();
      Swal.fire("Updated!", "Product updated successfully.", "success");
    } catch (error) {
      Swal.fire("Error!", "Failed to update the product.", "error");
    }
  };

  const handleCategoryChange = (e) => {
    setEditProduct({ ...editProduct, category: e.target.value });
  };

  return (
    <div className="container  mx-auto p-6 mr-2">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Products</h2>

      {/* ตารางแสดงสินค้า */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto  w-full border-collapse border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border">Image</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Price (THB)</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-3">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="text-center">
                    <td className="p-3 border">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover mx-auto rounded-md"
                      />
                    </td>
                    <td className="p-3 border">{product.name}</td>
                    <td className="p-3 border">{product.category}</td>
                    <td className="p-3 border">{product.price} THB</td>
                    <td className="p-3 border">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-error text-white px-3 py-1 rounded"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal สำหรับแก้ไขสินค้า */}
      {editProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <label className="block">Product Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-3"
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
            />
            <label className="block">Description</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-3"
              value={editProduct.description}
              onChange={(e) =>
                setEditProduct({ ...editProduct, description: e.target.value })
              }
            />

            <label className="block">Price (THB)</label>
            <input
              type="number"
              className="w-full border p-2 rounded mb-3"
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({ ...editProduct, price: e.target.value })
              }
            />

            {/* <label className="block">Category</label>
            <select
              className="w-full border p-2 rounded mb-3"
              value={editProduct.category}
              onChange={handleCategoryChange}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="clothing">Clothing</option>
              <option value="accessories">Accessories</option>
              <option value="electronics">Gadgets</option>
              <option value="electronics">Swag</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select> */}

            <label className="block">Image</label>
            <input type="file" onChange={handleImageChange} />
            {imagePreview && (
              <img
                src={imagePreview}
                className="mt-4 w-full h-48 object-cover rounded-lg"
              />
            )}

            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setEditProduct(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
