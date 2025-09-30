const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Blocklist = require("../models/blocklist.model");

const signup = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    // check existing user
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ message: "You have already registered, try to login." });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // check valid role
    const validRoles = ["admin", "owner", "user"];
    const userRole = validRoles.includes(role) ? role : "user";

    // create new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role: userRole,
    });

    await newUser.save();

    res.status(201).json({
      message: "Registered Successfully",
      user: {
        id: newUser._id, // MongoDB _id
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        created_at: newUser.created_at,
      },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({  email  });
    if (!user) {
      res
        .status(400)
        .json({ message: "You don't have an account, try to register" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Password incorrect!" });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email,role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Signin Successfull",
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
      },
    });
  } catch (err) {
    console.log("Signin error", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try{
    const authHeader = req.headers['authorization'];

    if(!authHeader){
      return res.status(403).json({message: "Authorization header missing"});
    }

    const accessToken = authHeader.split(" ")[1];

    if(!accessToken){
      return res.status(400).json({message:"Tokens are required to logout"});
    }

    await Blocklist.create({token: accessToken, type: "access"});

    res.status(200).json({message : "Logout successfully"});
    
  }catch(err) {
    console.log('Logout error', err);
    res.status(500).json({message:"Internal server error"});
  }
}
module.exports = { signup, signin, logout};