import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiLogOut,
  FiChevronDown,
  FiBook,
  FiPlus,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { BaseURL } from "../api";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold"
              style={{ color: "#dd8725" }}
            >
              <FiBook className="w-7 h-7" />
              <span>Quiz App</span>
            </Link>
          </div>

          {/* Center: Nav Links */}
          <div className="hidden md:flex space-x-8 text-lg font-medium gap-6" >
            <Link to="/" className="text-white hover:text-[#dd8725] transition">
              Home
            </Link>
            <Link
              to="/progress-track"
              className="text-white hover:text-[#dd8725] transition"
            >
              Progress Track
            </Link>
          </div>

          {/* Right: Buttons/Profile */}
          <div className="hidden md:flex items-center gap-4">
            {user && user.role === "admin" && (
              <>
                <Link
                  to="/add-quetions"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold shadow-md 
                             bg-gradient-to-r from-[#dd8725] to-[#e6a345] text-[#1f1f1f] 
                             hover:from-[#e6a345] hover:to-[#dd8725] hover:scale-105 
                             transition-all duration-300 ease-in-out"
                             
                  style={{padding:"5px"}}
                >
                  <FiPlus className="w-5 h-5" />
                  Add Questions
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold shadow-md 
                             bg-[#4d5156] text-white hover:bg-[#5d6267] hover:scale-105 
                             transition-all duration-300 ease-in-out"
                  style={{padding:"8px"}}
                >
                  Dashboard
                </Link>
              </>
            )}

            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowProfileMenu((v) => !v)}
                  className="flex items-center space-x-2 px-3 py-1 rounded-full hover:bg-[#4d5156] transition-all"
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
                  <span className="hidden sm:inline">{user.name}</span>
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
                      style={{padding:"8px"}}
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-6 py-2 rounded-full font-semibold shadow-md 
                             bg-[#4d5156] text-white hover:bg-[#dd8725] hover:text-[#1f1f1f] hover:scale-105 
                             transition-all duration-300 ease-in-out"
                             style={{paddingLeft:"20px", paddingRight:"20px", paddingTop:"5px", paddingBottom:"5px"}}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-6 py-2 rounded-full font-semibold shadow-md 
                             bg-gradient-to-r from-[#dd8725] to-[#e6a345] text-[#1f1f1f] 
                             hover:from-[#e6a345] hover:to-[#dd8725] hover:scale-105 
                             transition-all duration-300 ease-in-out"
                  style={{paddingLeft:"20px", paddingRight:"20px", paddingTop:"5px", paddingBottom:"5px"}}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden flex flex-col space-y-4 px-6 py-4 border-t"
          style={{ background: "#1f1f1f", borderColor: "#4d5156" }}
        >
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-white">
            Home
          </Link>
          <Link
            to="/progress-track"
            onClick={() => setMenuOpen(false)}
            className="text-white"
          >
            Progress Track
          </Link>

          {user && user.role === "admin" && (
            <>
              <Link
                to="/add-quetions"
                onClick={() => setMenuOpen(false)}
                className="text-white"
              >
                Add Questions
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="text-white"
              >
                Dashboard
              </Link>
            </>
          )}

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 text-[#dd8725]"
            >
              <FiLogOut />
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-[#dd8725]"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
