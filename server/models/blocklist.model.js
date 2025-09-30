const mongoose = require("mongoose");

const blocklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["access", "refresh"],
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "blocklists", 
    timestamps: { createdAt: "created_at", updatedAt: false },
  }
);

const Blocklist = mongoose.model("Blocklist", blocklistSchema);

module.exports = Blocklist;