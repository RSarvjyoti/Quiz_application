import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FiEdit, FiList, FiPlusCircle, FiCheckCircle, FiTag } from "react-icons/fi";
import { BaseURL } from "../api";

const CreateQuestions = () => {
  const [form, setForm] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
    category: "",
  });

  // Get role from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("accessToken");

  // Only show form if role is admin
  if (user.role !== "admin") {
    return (
      <div className="text-center mt-10 text-lg text-[#dd8725]">
        Only admin can add questions.
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (idx, value) => {
    const newOptions = [...form.options];
    newOptions[idx] = value;
    setForm({ ...form, options: newOptions });
  };

  const addOption = () => {
    setForm({ ...form, options: [...form.options, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.question ||
      !form.answer ||
      !form.category ||
      form.options.some((opt) => !opt)
    ) {
      toast.error("All fields and options are required!");
      return;
    }
    try {
      await axios.post(
        `${BaseURL}/question/add-question`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Question added!");
      setForm({
        question: "",
        options: ["", "", "", ""],
        answer: "",
        category: "",
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to add question."
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #182232 0%, #4d5156 100%)",
      }}
    >
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-[#1f1f1f] rounded-xl shadow-2xl p-8 flex flex-col gap-6"
        style={{ color: "#ffffff", padding:"20px" }}
      >
        <h2 className="text-2xl font-bold text-center mb-4 flex items-center justify-center gap-2" style={{ color: "#dd8725" }}>
          <FiPlusCircle className="inline-block mb-1" />
          Add New Question
        </h2>
        <div className="flex items-center gap-2">
          <FiEdit className="text-[#dd8725] w-5 h-5" />
          <input
            type="text"
            name="question"
            value={form.question}
            onChange={handleChange}
            placeholder="Question"
            required
            className="w-full px-4 py-3 border-2 border-[#4d5156] rounded-lg bg-[#182232] text-[#ffffff] focus:outline-none focus:border-[#dd8725]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-semibold text-[#dd8725] flex items-center gap-2">
            <FiList className="w-5 h-5" />
            Options
          </label>
          {form.options.map((opt, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <FiPlusCircle className="text-[#4d5156] w-4 h-4" />
              <input
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                placeholder={`Option ${idx + 1}`}
                required
                className="w-full px-4 py-2 border-2 border-[#4d5156] rounded-lg bg-[#182232] text-[#ffffff] focus:outline-none focus:border-[#dd8725]"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
            className="self-start mt-2 px-4 py-1 rounded-full bg-[#dd8725] text-[#1f1f1f] font-medium hover:bg-[#4d5156] hover:text-[#dd8725] transition-all flex items-center gap-2"
          >
            <FiPlusCircle />
            Add Option
          </button>
        </div>
        <div className="flex items-center gap-2">
          <FiCheckCircle className="text-[#dd8725] w-5 h-5" />
          <input
            type="text"
            name="answer"
            value={form.answer}
            onChange={handleChange}
            placeholder="Correct Answer"
            required
            className="w-full px-4 py-3 border-2 border-[#4d5156] rounded-lg bg-[#182232] text-[#ffffff] focus:outline-none focus:border-[#dd8725]"
          />
        </div>
        <div className="flex items-center gap-2">
          <FiTag className="text-[#dd8725] w-5 h-5" />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="w-full px-4 py-3 border-2 border-[#4d5156] rounded-lg bg-[#182232] text-[#ffffff] focus:outline-none focus:border-[#dd8725]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#dd8725] text-[#1f1f1f] py-3 px-4 rounded-lg text-lg font-semibold hover:bg-[#4d5156] hover:text-[#dd8725] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#dd8725] focus:ring-offset-2 flex items-center justify-center gap-2"
        >
          <FiPlusCircle />
          Add Question
        </button>
      </form>
    </div>
  );
};

export default CreateQuestions;