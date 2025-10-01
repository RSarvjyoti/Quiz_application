const Progress = require("../models/Progress.model");

const saveProgress = async (req, res) => {
  try {
    const { category, correctAnswers, wrongAnswers } = req.body;
    if (!category || correctAnswers == null || wrongAnswers == null) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const progress = new Progress({
      userId: req.user.id,
      category,
      correctAnswers,
      wrongAnswers,
    });
    await progress.save();
    res.status(201).json({ message: "Progress saved!", progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "saveProgress Error" });
  }
};

const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user.id });
    res.json(progress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "getProgress Error" });
  }
};

module.exports = { saveProgress, getProgress };
