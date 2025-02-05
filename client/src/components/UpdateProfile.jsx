import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [preview, setPreview] = useState("");

  // ดึงข้อมูลโปรไฟล์เมื่อ component โหลด
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
      setPreview(user.photoURL || "https://via.placeholder.com/150"); // ถ้าไม่มีรูป ให้ใส่ Placeholder
    }
  }, [user]);

  // แสดง preview ทันทีที่กรอก URL ใหม่
  const handlePhotoChange = (e) => {
    setPhotoURL(e.target.value);
    setPreview(e.target.value || "https://via.placeholder.com/150");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Updating Profile...",
      text: "Please wait a moment.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await updateProfile(name, photoURL);
      Swal.fire({
        title: "Profile Updated!",
        text: "Your profile has been updated successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      Swal.fire({
        title: "Update Failed!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>

        {/* แสดงรูปโปรไฟล์ */}
        <div className="flex justify-center mb-4">
          <img
            src={preview}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full border"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="input input-bordered w-full"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo URL
            </label>
            <input
              type="text"
              value={photoURL}
              onChange={handlePhotoChange}
              placeholder="Enter photo URL"
              className="input input-bordered w-full"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="btn bg-red w-full text-white hover:bg-red-600"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
