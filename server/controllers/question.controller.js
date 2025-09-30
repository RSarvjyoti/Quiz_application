const Question = require("../models/questions.model");

const addQuestion = async (req, res) => {
  try {
    const { question, options, answer, category } = req.body;
    if (!question || !options || !answer || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (!Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ message: "Options must be an array with at least 2 items." });
    }
    const newQuestion = new Question({ question, options, answer, category });
    await newQuestion.save();
    res.status(201).json({ message: "Question added!", question: newQuestion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "addQuestion Error" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Question.distinct("category");
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "getCategories error" });
  }
};

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "getQuestions error" });
  }
};

const getQuestionsBycategory = async (req, res) => {
  try {
    const { category } = req.params;
    const questions = await Question.find({ category });
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "getQuestionsBycategory error" });
  }
};

module.exports = {
  addQuestion,
  getCategories,
  getQuestions,
  getQuestionsBycategory,
};
