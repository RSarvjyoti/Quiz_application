const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    correctAnswers: {
      type: Number,
      default: 0,
      min: 0,
    },
    wrongAnswers: {
      type: Number,
      default: 0,
      min: 0,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "progress",
    timestamps: { updatedAt: "updated_at" },
  }
);

const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;
