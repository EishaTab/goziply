"use client";
import { useState, useMemo, useEffect } from "react";
import {
  FaUsers,
  FaTasks,
  FaChartLine,
  FaUserCircle,
  FaCheckCircle,
  FaIdCard,
  FaCheck,
  FaTimes,
  FaClock,
} from "react-icons/fa";

const ADMIN_PASSWORD = "admin123";

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div
    className={`p-4 rounded-xl shadow-lg bg-white border border-${color}-100`}
  >
    <div className={`flex items-center justify-between text-${color}-600`}>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <Icon className="w-6 h-6" />
    </div>
    <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordAttempt, setPasswordAttempt] = useState("");
  const [authError, setAuthError] = useState("");

  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [approvalFilter, setApprovalFilter] = useState("All");

  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/users", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsersData(data.users || data);
    } catch (err) {
      console.error(err);
      setError("Failed to load users data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchUsers();
  }, [isAuthenticated]);

  const showMessage = (message) => {
    setActionMessage(message);
    setTimeout(() => setActionMessage(""), 3000);
  };

  // ✅ Approve Tasker
  const handleApproveTasker = async (userId) => {
    try {
      setActionLoading(true);
      const res = await fetch(`/api/admin/approved-tasker/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const result = await res.json();
        showMessage("✅ " + (result.message || "Tasker approved successfully!"));
        await fetchUsers();
      } else {
        throw new Error("Failed to approve tasker");
      }
    } catch (err) {
      showMessage("❌ Error: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // ❌ Reject Tasker
  const handleRejectTasker = async (userId) => {
    if (
      !confirm(
        "Are you sure you want to reject this tasker? They will not appear on the booking page."
      )
    )
      return;
    try {
      setActionLoading(true);
      const res = await fetch(`/api/admin/rejected-tasker/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const result = await res.json();
        showMessage("❌ " + (result.message || "Tasker rejected!"));
        await fetchUsers();
      } else {
        throw new Error("Failed to reject tasker");
      }
    } catch (err) {
      showMessage("❌ Error: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!isAuthenticated) return [];

    let list = usersData;

    if (filterRole !== "All") {
      list = list.filter((user) => user.role === filterRole.toLowerCase());
    }

    if (approvalFilter !== "All") {
      if (approvalFilter === "Pending")
        list = list.filter((u) => u.isApproved === false);
      else if (approvalFilter === "Approved")
        list = list.filter((u) => u.isApproved === true);
    }

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      list = list.filter(
        (u) =>
          u.firstName?.toLowerCase().includes(lower) ||
          u.lastName?.toLowerCase().includes(lower) ||
          u.email?.toLowerCase().includes(lower)
      );
    }
    return list;
  }, [usersData, searchTerm, filterRole, approvalFilter, isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordAttempt === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect Password. Try again.");
      setPasswordAttempt("");
    }
  };

  const totalUsers = usersData.length;
  const totalTaskers = usersData.filter((u) => u.role === "tasker").length;
  const pendingTaskers = usersData.filter(
    (u) => u.role === "tasker" && !u.isApproved
  ).length;
  const approvedTaskers = usersData.filter(
    (u) => u.role === "tasker" && u.isApproved
  ).length;

  const stats = [
    { title: "Total Users", value: totalUsers, icon: FaUsers, color: "blue" },
    { title: "Total Taskers", value: totalTaskers, icon: FaTasks, color: "green" },
    { title: "Pending Approval", value: pendingTaskers, icon: FaClock, color: "yellow" },
    { title: "Approved Taskers", value: approvedTaskers, icon: FaCheckCircle, color: "green" },
  ];

  if (!isAuthenticated)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm border border-gray-200"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
            Admin Login
          </h2>
          <input
            type="password"
            value={passwordAttempt}
            onChange={(e) => setPasswordAttempt(e.target.value)}
            placeholder="Enter admin password"
            className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {authError && (
            <p className="text-sm text-red-600 mb-3 bg-red-50 p-2 rounded-lg">
              {authError}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {actionMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {actionMessage}
        </div>
      )}

      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Manage taskers and approvals</p>
        </div>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          User Management
        </h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="p-2 border rounded-lg bg-white"
          >
            <option value="All">All Roles</option>
            <option value="tasker">Tasker</option>
            <option value="admin">Admin</option>
          </select>
          <select
            value={approvalFilter}
            onChange={(e) => setApprovalFilter(e.target.value)}
            className="p-2 border rounded-lg bg-white"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending Approval</option>
            <option value="Approved">Approved</option>
          </select>
        </div>

        {loading && <div className="p-4 text-center text-blue-600">Loading users...</div>}
        {error && (
          <div className="p-4 text-center text-red-600 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id || user.email} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user.role || "tasker"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.isApproved
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {user.isApproved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {!user.isApproved ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApproveTasker(user._id)}
                            disabled={actionLoading}
                            className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xs"
                          >
                            <FaCheck /> Approve
                          </button>
                          <button
                            onClick={() => handleRejectTasker(user._id)}
                            disabled={actionLoading}
                            className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xs"
                          >
                            <FaTimes /> Reject
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRejectTasker(user._id)}
                          className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xs"
                        >
                          <FaTimes /> Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
