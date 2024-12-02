const userModel = require("../models/userModel");

// Login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "An error occurred during login.",
    });
  }
};

// Register callback
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already registered" });
    }

    const newUser = new userModel({ name, email, password });
    await newUser.save();
    res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "An error occurred during registration.",
    });
  }
};

// Controller to handle avatar upload and update user profile
const uploadAvatar = async (req, res) => {
  try {
    const { userId } = req.body; // Extract userId from the request body

    // Log request data
    console.log("Request Body:", req.body);
    console.log("File received:", req.file);

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const filePath = `/uploads/${req.file.filename}`;
    const user = await userModel.findByIdAndUpdate(
      userId,
      { avatar: filePath },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      avatarUrl: filePath,
      message: "Avatar updated successfully",
    });
  } catch (error) {
    console.error("Error in uploadAvatar:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// GETTING USER
const getUserController = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("Fetching user with ID:", userId);

    // Ensure the userId is an ObjectId
    const objectId = new mongoose.Types.ObjectId(userId);

    const user = await userModel.findById(objectId);
    console.log("User found:", user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User found", user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// REGISTER EXPENSE
const mongoose = require("mongoose");

const expenseRegisterController = async (req, res) => {
  try {
    const { userId, expname, expamount, expamounttype, expdate } = req.body;

    // Validate input fields
    if (!userId || !expname || !expamount || !expamounttype) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: userId, expname, expamount, expamounttype.",
      });
    }

    // Create a valid expense object
    const newExpense = {
      expname,
      expamount: parseFloat(expamount), // Ensure it's a number
      expamounttype,
      expdate: expdate ? new Date(expdate) : new Date(), // Default to current date if none provided
    };

    // Validate the expense object
    if (
      !newExpense.expname ||
      isNaN(newExpense.expamount) ||
      !newExpense.expamounttype
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid expense object structure.",
      });
    }

    // Find and update the user document, adding the new expense
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { $push: { expense: newExpense } },
      { new: true } // To return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Expense registered successfully.",
      data: updatedUser.expense,
    });
  } catch (error) {
    console.error("Error in expenseRegisterController:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while registering the expense.",
      error: error.message,
    });
  }
};

//GET EXPENSE
const expenseGetController = async (req, res) => {
  try {
    const { userId } = req.query; // Assuming you're sending the userId as a query parameter
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await userModel.findById(userId);
    if (!user || !user.expense || user.expense.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No expenses found for this user." });
    }

    res.status(200).json({ success: true, expenses: user.expense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  loginController,
  registerController,
  uploadAvatar,
  expenseGetController,
  expenseRegisterController,
  getUserController,
};
