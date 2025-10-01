import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateQuestions from "../components/CreateQuestions";
import { BaseURL } from "../api";
import { FiUsers, FiLogOut, FiHome, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) setCurrentUser(user);

    const fetchUsers = async () => {
      try {
        if (token && user?.role === "admin") {
          const res = await axios.get(
            `${BaseURL}/auth/users?page=${page}&limit=${limit}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUsers(res.data.users);
          setTotalPages(res.data.totalPages || 1);
          setTotalUsers(res.data.total || 0);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.post(`${BaseURL}/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-4" style={{ background: "linear-gradient(135deg, #182232 0%, #4d5156 100%)", color: "#ffffff" }}>
      {/* Sidebar */}
      <div className="bg-[#1f1f1f] p-6 shadow-lg flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6 text-[#dd8725]">Admin Panel</h2>
          <ul className="space-y-3">
            <li className="hover:text-[#dd8725] cursor-pointer flex items-center gap-2" onClick={() => navigate("/dashboard")}>
              <FiHome /> Dashboard
            </li>
            <li className="hover:text-[#dd8725] cursor-pointer flex items-center gap-2" onClick={() => navigate("/users")}>
              <FiUsers /> Users
            </li>
          </ul>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="col-span-2 p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {currentUser && (
              <p className="mb-2">
                Welcome <strong>{currentUser.name}</strong> ({currentUser.role})
              </p>
            )}

            {currentUser?.role === "admin" ? (
              <div className="bg-[#1f1f1f] rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2 text-[#dd8725]">
                    <FiUsers /> All Users
                  </h3>
                  <span className="text-[#dd8725] font-semibold">Total Users: {totalUsers}</span>
                </div>

                {/* Users Table */}
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#182232] text-[#dd8725]">
                      <th className="px-4 py-2 border border-[#4d5156]">#</th>
                      <th className="px-4 py-2 border border-[#4d5156]">Name</th>
                      <th className="px-4 py-2 border border-[#4d5156]">Email</th>
                      <th className="px-4 py-2 border border-[#4d5156]">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, idx) => (
                      <tr key={u._id} className="hover:bg-[#2a2f3a] transition">
                        <td className="px-4 py-2 border border-[#4d5156] text-center">{(page - 1) * limit + idx + 1}</td>
                        <td className="px-4 py-2 border border-[#4d5156]">{u.name}</td>
                        <td className="px-4 py-2 border border-[#4d5156]">{u.email}</td>
                        <td className="px-4 py-2 border border-[#4d5156]">{u.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-[#dd8725] text-[#1f1f1f] rounded-lg disabled:opacity-50 hover:bg-[#4d5156] hover:text-[#dd8725] transition"
                  >
                    Prev
                  </button>
                  <span>Page {page} of {totalPages}</span>
                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-[#dd8725] text-[#1f1f1f] rounded-lg disabled:opacity-50 hover:bg-[#4d5156] hover:text-[#dd8725] transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <p className="mb-4 text-red-500">You don’t have permission to view users</p>
            )}
          </>
        )}
      </div>

      {/* Right side - CreateQuestions */}
      <div className="p-6">
        <CreateQuestions />
      </div>
    </div>
  );
};

export default Dashboard;
