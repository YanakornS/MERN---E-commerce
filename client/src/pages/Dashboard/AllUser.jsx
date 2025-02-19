import { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import Swal from "sweetalert2";
import { FaUser, FaUserShield } from "react-icons/fa";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await UserService.getAllUsers();

      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
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
      await UserService.updateUserRole(selectedUser.email, newRole);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === selectedUser.email ? { ...user, role: newRole } : user
        )
      );

      Swal.fire({
        title: "Updated!",
        text: "User role has been updated.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      document.getElementById("editUserModal").close();
    } catch (error) {
      console.error("Error updating user role:", error);
      Swal.fire("Error!", "Failed to update user role.", "error");
    }
  };

  const handleDeleteUser = async (email) => {
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
        await UserService.deleteUser(email);
        setUsers(users.filter((user) => user.email !== email));

        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire("Error!", "Failed to delete user.", "error");
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-6">All Users</h2>

      {/* Search Box */}
      <div className="flex justify-end mb-5">
        <input
          type="text"
          placeholder="Search users..."
          className="input input-bordered w-full max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Registered At</th>
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
              users
                .filter((user) => user.email.includes(search))
                .map((user, index) => (
                  <tr key={user.email} className="border">
                    <td className="p-2 text-center">{index + 1}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-4 py-2 text-xs font-bold rounded-md flex items-center justify-center w-24 ${
                          user.role === "admin"
                            ? "bg-purple-600 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {user.role === "admin" ? (
                          <FaUserShield className="mr-1" />
                        ) : (
                          <FaUser className="mr-1" />
                        )}
                        {user.role}
                      </span>
                    </td>
                    <td className="p-2 text-center">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2 text-center">
                      <button
                        className="btn btn-sm btn-warning mr-2"
                        onClick={() => openEditModal(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDeleteUser(user.email)}
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
