// API Functions
import axios from "axios";
import { message } from "antd";

const API = "http://localhost:8080/api/v1/users";

export const getExpense = async () => {
  const user = JSON.parse(localStorage.getItem("user")); // Fetch user data from localStorage
  if (!user) {
    message.error("No user found in localStorage.");
    return [];
  }

  const userId = user._id; // Get the userId from the stored user data
  try {
    const response = await axios.get(`${API}/${userId}`);
    console.log("Expense data fetched:", response.data.user.expense);
    return response.data.user.expense;
  } catch (error) {
    message.error("Error fetching expenses:", error.response?.data || error.message);
    console.error("Error fetching expenses:", error);
    return [];
  }
};

export const handleExpenseButtonClick = async () => {
  return await getExpense(); // Reuse getExpense function
};
