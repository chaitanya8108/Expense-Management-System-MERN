const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required and should be unique"],
      unique: true,
      index: true, // Explicit indexing for better performance
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      type: String,
      default: "https://www.ferill.is/wp-content/uploads/2020/11/avatar-placeholder.png", // Default avatar
    },
    expense: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId, // Link the expense to the user by ObjectId
          ref: 'users',
          required: true
        },
        expname: {
          type: String,
          required: [true, "Expense Name is required"],
        },
        expamount: {
          type: Number, // Changed to Number for arithmetic operations
          required: [true, "Amount is required"],
        },
        expamounttype: {
          type: String,
          required: [true, "Amount Type is required"],
        },
        expdate: {
          type: Date, // Default handled in the controller
        },
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
