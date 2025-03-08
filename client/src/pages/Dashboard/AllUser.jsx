import { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import Swal from "sweetalert2";
import {  FaEdit, FaTrash } from "react-icons/fa";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await UserService.getAllUsers();
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      setLoading(false);
    })();
  }, []);

  const handleToggleRole = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";

    try {
      await UserService.updateUser(user._id, {
        email: user.email,
        role: newRole,
      });
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === user._id ? { ...u, role: newRole } : u))
      );

      Swal.fire("Updated!", `User role changed to ${newRole}.`, "success");
    } catch (error) {
      console.error("Error updating user role:", error);
      Swal.fire("Error!", "Failed to update user role.", "error");
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    document.getElementById("editUserModal").showModal();
  };

  const handleUpdateRole = async () => {
    if (!selectedUser) return;
    try {
      await UserService.updateUser(selectedUser._id, {
        email: selectedUser.email,
        role: newRole,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id ? { ...user, role: newRole } : user
        )
      );

      Swal.fire("Updated!", "User role has been updated.", "success");
      document.getElementById("editUserModal").close();
    } catch (error) {
      console.error("Error updating user role:", error);
      Swal.fire("Error!", "Failed to update user role.", "error");
    }
  };

  const handleDeleteUser = async (id) => {
    console.log("Deleting user with ID:", id);
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await UserService.deleteUser(id);
        setUsers(users.filter((user) => user._id !== id));

        Swal.fire("Deleted!", "User has been deleted successfully.", "success");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire("Error!", "Failed to delete user.", "error");
    }
  };

  const changeRole = (email, role) => {
    UserService.getRoleByEmail(email).then((res) => {
      const role = res.data.role;
      if (role === "admin") {
        UserService.makeUser(email).then((res) => {
          setUsers(user.map());
        });
      }
    });
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-6">All Users</h2>

      <div className=" mb-4">
        <span className="text-lg  font-semibold">
          Total Users: {users.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>

              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id} className="border">
                  <td className="p-2 text-center">{index + 1}</td>
                  <td className="p-2">{user.email}</td>

                  {/* Toggle Role (แสดงเฉพาะ Role ที่กำลังใช้งาน) */}
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={user.role === "admin"}
                          onChange={() => handleToggleRole(user)}
                        />
                        <div className="w-14 h-7 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-7 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                      <span className="ml-3 text-sm font-bold text-gray-700">
                        {user.role === "admin" ? "Admin" : "User"}
                      </span>
                    </div>
                  </td>

                  <td className="p-2 text-center">
                    <button
                      className="btn btn-sm btn-warning mr-2"
                      onClick={() => openEditModal(user)}
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal สำหรับแก้ไข Role */}
      <dialog id="editUserModal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Edit User Role</h3>
          <p className="text-gray-600 mb-4">
            Changing role for <strong>{selectedUser?.email}</strong>
          </p>

          <select
            className="select select-bordered w-full mb-4"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleUpdateRole}>
              Save Changes
            </button>
            <button
              className="btn"
              onClick={() => document.getElementById("editUserModal").close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllUser;
