import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BaseURL } from "../api";

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${BaseURL}/auth/signin`, formData);

      const { access_token, user } = response.data;

      if (!user || !access_token) {
        throw new Error("Invalid response from server");
      }

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login successful!");

      setTimeout(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (storedUser?.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }, 800);
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #182232 0%, #4d5156 100%)",
      }}
    >
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#1f1f1f] rounded-2xl shadow-2xl p-8 flex flex-col gap-6"
        style={{ color: "#ffffff" }}
      >
        <h2 className="text-3xl font-bold text-center" style={{ color: "#dd8725" }}>
          Login
        </h2>

        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#ffffffcc]">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 border-2 border-[#4d5156] rounded-lg bg-[#182232] text-white focus:outline-none focus:border-[#dd8725] focus:ring-2 focus:ring-[#dd8725] transition-all duration-200"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#ffffffcc]">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-3 border-2 border-[#4d5156] rounded-lg bg-[#182232] text-white focus:outline-none focus:border-[#dd8725] focus:ring-2 focus:ring-[#dd8725] transition-all duration-200"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-[#dd8725] text-[#1f1f1f] py-3 px-4 rounded-lg text-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#dd8725] focus:ring-offset-2 focus:ring-offset-[#1f1f1f] shadow-md ${
            isSubmitting
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-[#4d5156] hover:text-[#dd8725]"
          }`}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        {/* Signup Redirect */}
        <p className="text-center text-[#ffffffcc]">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-[#dd8725] hover:text-[#4d5156] font-medium">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
