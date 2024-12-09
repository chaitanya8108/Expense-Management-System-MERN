const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    // Compare the hashed password with the plain text password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "30d" } // Token expiration (1 hour)
    );
    // sessionStorage.setItem("token", token);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token, // Send token to the frontend
      user, // Optionally send the user details
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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({ name, email, password: hashedPassword });
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
// Controller to fetch expense by expenseId
const expenseGetController = async (req, res) => {
  try {
    const { expenseId } = req.params; // Get expenseId from the request parameters

    // Find the user who has the specific expenseId
    const user = await userModel.findOne(
      { "expense._id": expenseId },
      { "expense.$": 1 }
    );

    if (!user) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Return the found expense
    return res.status(200).json({ expense: user.expense[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//DELETE EXPENSE

const expenseDeleteController = async (req, res) => {
  try {
    const { expenseId } = req.params; // Get the expenseId from the request parameters

    // Find the user and remove the specific expense by its expenseId
    const user = await userModel.findOneAndUpdate(
      { "expense._id": expenseId }, // Find user with the matching expenseId
      { $pull: { expense: { _id: expenseId } } }, // Pull the expense with the matching expenseId
      { new: true } // Return the updated user document
    );

    if (!user) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res
      .status(200)
      .json({ message: "Expense deleted successfully", expenseId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteAllExpensesController = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from the URL parameter

    // Find the user and remove all expenses from the user's expense array
    const user = await userModel.findByIdAndUpdate(
      userId,
      { $set: { expense: [] } }, // Clears the expenses array
      { new: true } // Return the updated user
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "All expenses deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Search expenses by name for a specific user

const searchExpensesByExpenseName = async (req, res) => {
  console.log("Searching for expenses...");
  const { userId } = req.params;
  const { expenseName } = req.query;

  // Validate userId as a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId format" });
  }

  // Find the user by ID
  const user = await userModel.findById(userId);
  console.log("User found:", user);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Filter the user's expenses by expense name
  const filteredExpenses = user.expense.filter((expense) => {
    console.log("Expense:", expense);
    return expense.expname.toLowerCase().includes(expenseName.toLowerCase());
  });
  console.log("Filtered expenses:", filteredExpenses);

  if (filteredExpenses.length > 0) {
    return res.status(200).json(filteredExpenses);
  } else {
    return res
      .status(404)
      .json({ message: "No expenses found matching the expense name" });
  }
};

//Edit expense
const editExpenseController = async (req, res) => {
  try {
    const { expenseId } = req.params; // Get the expenseId from the URL parameters
    const { expname, expamount, expamounttype, expdate } = req.body; // Get the updated fields from the request body

    // Validate input
    if (!expenseId) {
      return res
        .status(400)
        .json({ success: false, message: "Expense ID is required" });
    }

    // Construct the fields to be updated
    const updatedFields = {};
    if (expname) updatedFields["expense.$.expname"] = expname;
    if (expamount) updatedFields["expense.$.expamount"] = parseFloat(expamount); // Ensure amount is a number
    if (expamounttype) updatedFields["expense.$.expamounttype"] = expamounttype;
    if (expdate) updatedFields["expense.$.expdate"] = new Date(expdate);

    // Update the specific expense using array filters
    const user = await userModel.findOneAndUpdate(
      { "expense._id": expenseId }, // Find the user with the matching expenseId in their expense array
      { $set: updatedFields }, // Update the matched expense's fields
      { new: true } // Return the updated document
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      updatedExpense: user.expense.find(
        (exp) => exp._id.toString() === expenseId
      ),
    });
  } catch (error) {
    console.error("Error in editExpenseController:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while editing the expense",
      error: error.message,
    });
  }
};

module.exports = {
  loginController,
  registerController,
  uploadAvatar,
  expenseGetController,
  expenseRegisterController,
  getUserController,
  expenseDeleteController,
  deleteAllExpensesController,
  searchExpensesByExpenseName,
  editExpenseController,
};
