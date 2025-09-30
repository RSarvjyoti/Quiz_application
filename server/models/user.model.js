const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be 2-20 chars."],
      maxlength: [20, "Name must be 2-20 chars."],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    photo: {
      type: String,
      default:
        "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?w=740",
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
