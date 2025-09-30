import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BaseURL } from "../api";

const Signup = () => {
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    if (formData.photo) {
      formDataToSend.append("photo", formData.photo);
    }

    try {
      const response = await axios.post(
        `${BaseURL}/auth/signup`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success(response.data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => toast.error(err.msg));
      } else {
        toast.error(error.response?.data?.message || "Signup failed!");
      }
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
        className="w-full max-w-md bg-[#1f1f1f] rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6"
        style={{ color: "#ffffff" }}
      >
        <h2 className="text-3xl font-bold text-center" style={{ color: "#dd8725" }}>
          Create Account
        </h2>

        {/* Profile Photo */}
        <div className="relative w-24 h-24">
          <div className="w-full h-full rounded-full border-4 border-[#dd8725] overflow-hidden shadow-inner bg-[#4d5156] flex items-center justify-center">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-12 h-12 text-[#dd8725]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-[#dd8725] rounded-full p-2 cursor-pointer hover:bg-[#4d5156] transition-colors duration-200 shadow-lg">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </label>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-4 w-full">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full px-4 py-3 border-2 border-[#4d5156] rounded-lg bg-[#182232] text-[#ffffff] focus:outline-none focus:border-[#dd8725] focus:ring-2 focus:ring-[#dd8725] transition-all duration-200"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-3 border-2 border-[#4d5156] rounded-lg bg-[#182232] text-[#ffffff] focus:outline-none focus:border-[#dd8725] focus:ring-2 focus:ring-[#dd8725] transition-all duration-200"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-3 border-2 border-[#4d5156] rounded-lg bg-[#182232] text-[#ffffff] focus:outline-none focus:border-[#dd8725] focus:ring-2 focus:ring-[#dd8725] transition-all duration-200"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#dd8725] text-[#1f1f1f] py-3 px-4 rounded-lg text-lg font-semibold hover:bg-[#4d5156] hover:text-[#dd8725] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#dd8725] focus:ring-offset-2 focus:ring-offset-[#1f1f1f] mt-2"
        >
          Sign Up
        </button>

        {/* Login Redirect */}
        <p className="text-[#ffffffcc] text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[#dd8725] hover:text-[#4d5156] font-medium">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
