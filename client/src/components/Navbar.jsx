import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiLogOut, FiChevronDown, FiBook, FiPlus } from "react-icons/fi";
import { BaseURL } from "../api";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      try {
        const response = await axios.get(`${BaseURL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("accessToken");
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${BaseURL}/auth/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch {}
    localStorage.removeItem("accessToken");
    setUser(null);
    setShowProfileMenu(false);
    navigate("/login");
  };

  return (
    <nav
      style={{
        background: "#182232",
        color: "#ffffff",
        borderBottom: "2px solid #dd8725",
        boxShadow: "0 2px 8px rgba(77,81,86,0.08)",
      }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between h-20">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold"
            style={{ color: "#dd8725" }}
          >
            <FiBook className="w-7 h-7" />
            <span>Quiz App</span>
          </Link>

          <Link
            to="/"
            className="flex items-center space-x-2 font-bold"
            style={{ color: "#ffffff" }}
          >
            <span>Home</span>
          </Link>

          <Link
            to="/progress-track"
            className="flex items-center space-x-2 font-bold"
            style={{ color: "#ffffff" }}
          >
            <span>Progress Track</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user && user.role === "admin" && (
              <div className="flex items-center gap-4">
                <Link
                  to="/add-quetions"
                  className="inline-flex items-center gap-2 px-5 py-2 font-medium rounded-full transition-all duration-200 shadow hover:bg-[#dd8725] hover:text-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-[#dd8725]"
                  style={{
                    color: "#ffffff",
                    padding: "10px"
                  }}
                >
                  <FiPlus className="w-5 h-5" />
                  <span>Add Questions</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-2 font-medium rounded-full transition-all duration-200 shadow hover:bg-[#dd8725] hover:text-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-[#dd8725]"
                  style={{
                    color: "#ffffff",
                    padding: "10px", 
                    marginRight: "10px"
                  }}
                >
                  Dashboard
                </Link>
              </div>
            )}

            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowProfileMenu((v) => !v)}
                  className="flex items-center space-x-2 px-2 py-1 rounded-full hover:bg-[#4d5156] transition-all"
                  style={{ color: "#ffffff" }}
                >
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover border-2"
                      style={{ borderColor: "#dd8725" }}
                    />
                  ) : (
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-semibold"
                      style={{
                        background: "#dd8725",
                        color: "#1f1f1f",
                        border: "2px solid #4d5156",
                      }}
                    >
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span
                    className="font-medium hidden sm:inline"
                    style={{ color: "#ffffff" }}
                  >
                    {user.name}
                  </span>
                  <FiChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      showProfileMenu ? "rotate-180" : ""
                    }`}
                    style={{ color: "#dd8725" }}
                  />
                </button>
                {showProfileMenu && (
                  <div
                    className="absolute right-0 mt-2 w-40 rounded-xl shadow-xl py-1 border"
                    style={{
                      background: "#1f1f1f",
                      color: "#ffffff",
                      borderColor: "#4d5156",
                    }}
                  >
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-[#dd8725] hover:bg-[#4d5156] transition-colors"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-6 py-2 font-medium rounded-full transition-all duration-200 shadow hover:bg-[#dd8725] hover:text-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-[#dd8725]"
                  style={{
                    background: "#4d5156",
                    color: "#ffffff",
                    minWidth: "100px",
                    textAlign: "center",
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-6 py-2 font-medium rounded-full transition-all duration-200 shadow hover:bg-[#4d5156] hover:text-[#dd8725] focus:outline-none focus:ring-2 focus:ring-[#4d5156]"
                  style={{
                    background: "#dd8725",
                    color: "#1f1f1f",
                    minWidth: "100px",
                    textAlign: "center",
                  }}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
