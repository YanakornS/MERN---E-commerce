import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const UpdateProfile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(name, photoURL)
      .then(() => {
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>
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
              onChange={(e) => setPhotoURL(e.target.value)}
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
