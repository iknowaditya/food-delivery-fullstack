import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/user/getAllUsers`
      );
      console.log("Fetched users:", response.data);

      // Updated to handle the correct response structure
      if (
        response.data &&
        response.data.success &&
        Array.isArray(response.data.data)
      ) {
        setUsers(response.data.data);
      } else {
        throw new Error("Invalid data format received from server");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message || "Failed to fetch users");
      toast.error("Failed to fetch users");
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/api/user/deleteUser/${userId}`
        );
        if (response.status === 200) {
          toast.success("User deleted successfully");
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user._id !== userId)
          );
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete user");
      }
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      (user.name &&
        user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.email &&
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.role && user.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#99f2c8]"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] p-6 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-[#99f2c8]/30 max-w-md text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ef4444"
            className="w-12 h-12 mx-auto mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-[#1f4037] mb-2">
            Error Loading Users
          </h2>
          <p className="text-[#1f4037]/70 mb-4">{error}</p>
          <button
            onClick={fetchUsers}
            className="px-4 py-2 bg-[#1f4037] text-white rounded-lg hover:bg-[#1f4037]/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1f4037]">User Management</h1>
          <p className="text-[#1f4037]/80">
            View and manage all registered users
          </p>
        </div>

        {/* Search and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#99f2c8]/30">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users by name, email or role..."
                className="w-full p-3 pl-10 rounded-lg border border-[#99f2c8]/50 focus:outline-none focus:ring-2 focus:ring-[#99f2c8] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#1f4037]/50 absolute left-3 top-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#99f2c8]/30">
              <h3 className="text-sm font-medium text-[#1f4037]/70">
                Total Users
              </h3>
              <p className="text-2xl font-bold text-[#1f4037] mt-1">
                {users.length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#99f2c8]/30">
              <h3 className="text-sm font-medium text-[#1f4037]/70">Admins</h3>
              <p className="text-2xl font-bold text-[#1f4037] mt-1">
                {users.filter((user) => user.role === "admin").length}
              </p>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#99f2c8]/30">
          <div className="p-6 border-b border-[#99f2c8]/30 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#1f4037]">All Users</h2>
            <span className="text-sm text-[#1f4037]/70">
              Showing {filteredUsers.length} of {users.length} users
            </span>
          </div>

          {filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#99f2c8]/30">
                <thead className="bg-[#1f4037]/5">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-[#1f4037]/70 uppercase tracking-wider"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-[#1f4037]/70 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-[#1f4037]/70 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-[#1f4037]/70 uppercase tracking-wider"
                    >
                      Joined
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-[#1f4037]/70 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#99f2c8]/30">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-[#99f2c8]/10 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#99f2c8] flex items-center justify-center text-[#1f4037] font-semibold">
                            {user.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-[#1f4037]">
                              {user.name}
                            </div>
                            <div className="text-sm text-[#1f4037]/50">
                              {user._id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#1f4037]">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === "admin"
                              ? "bg-[#1f4037] text-white"
                              : "bg-[#99f2c8] text-[#1f4037]"
                          }`}
                        >
                          {user.role || "user"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1f4037]/70">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-500 hover:text-red-700 mr-4 transition-colors duration-300"
                        >
                          Delete
                        </button>
                        <button className="text-[#1f4037] hover:text-[#99f2c8] transition-colors duration-300">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#1f4037"
                className="w-12 h-12 mx-auto mb-4 opacity-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
              <p className="text-[#1f4037]/70">
                {searchTerm ? "No users match your search" : "No users found"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
