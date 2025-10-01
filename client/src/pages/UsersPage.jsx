import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseURL } from "../api";
import { FiUsers } from "react-icons/fi";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const fetchUsers = async () => {
      try {
        if (token) {
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

  return (
    <div className="p-6 min-h-screen bg-[#22262e]">
      <div className="bg-[#1f1f1f] rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#ffffff]">
          <FiUsers /> All Users
        </h2>

        {loading ? (
          <p className="text-center text-[#ffffff]">Loading users...</p>
        ) : (
          <>
            <p className="mb-4 font-semibold text-[#ffffff]">
              Total Users: {totalUsers}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg overflow-hidden text-[#ffffff]">
                <thead className="bg-[#182232] text-[#ffffff]">
                  <tr>
                    <th className="px-4 py-3 border border-[#4d5156] text-center">#</th>
                    <th className="px-4 py-3 border border-[#4d5156]">Name</th>
                    <th className="px-4 py-3 border border-[#4d5156]">Email</th>
                    <th className="px-4 py-3 border border-[#4d5156]">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, idx) => (
                    <tr
                      key={u._id}
                      className={`transition hover:bg-[#2a2f3a] ${
                        idx % 2 === 0 ? "bg-[#22262e]" : "bg-[#1c1f24]"
                      }`}
                    >
                      <td className="px-4 py-2 border border-[#4d5156] text-center">{(page - 1) * limit + idx + 1}</td>
                      <td className="px-4 py-2 border border-[#4d5156]">{u.name}</td>
                      <td className="px-4 py-2 border border-[#4d5156]">{u.email}</td>
                      <td className="px-4 py-2 border border-[#4d5156]">{u.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-5 py-2 bg-[#dd8725] text-[#1f1f1f] rounded-lg disabled:opacity-50 hover:bg-[#f0a040] transition"
              >
                Prev
              </button>
              <span className="font-semibold text-[#ffffff]">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-5 py-2 bg-[#dd8725] text-[#1f1f1f] rounded-lg disabled:opacity-50 hover:bg-[#f0a040] transition"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UsersPage;