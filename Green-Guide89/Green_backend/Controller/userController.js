const User = require("../Model/UserModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "Email is already registered.",
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      status: true,
      message: "User registered successfully.",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error.",
      error: error.message,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
        data: null,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials.",
        data: null,
      });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      status: true,
      message: "Login successful.",
      data: { token },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error.",
      error: error.message,
    });
  }
};

module.exports.logout = (req, res) => {
  try {
    res.status(200).json({
      status: true,
      message: "Logout successful.",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error.",
      error: error.message,
    });
  }
};

module.exports.fetchUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password"); 
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
        data: null,
      });
    }

    res.status(200).json({
      status: true,
      message: "User fetched successfully.",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error.",
      error: error.message,
    });
  }
};
