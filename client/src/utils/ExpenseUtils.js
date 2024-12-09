// API Functions
import axios from "axios";
import { message } from "antd";

const API =
  "https://expense-management-system-mern-api.onrender.com/api/v1/users";
// "http://localhost:8080/api/v1/users";

export const getExpense = async () => {
  const user = JSON.parse(sessionStorage.getItem("user")); // Fetch user data from localStorage
  if (!user) {
    message.error("No user found in sessionStorage.");
    return [];
  }

  const userId = user._id; // Get the userId from the stored user data
  try {
    const response = await axios.get(`${API}/${userId}`);
    // console.log("Expense data fetched:", response.data.user.expense);
    return response.data.user.expense;
  } catch (error) {
    message.error(
      "Error fetching expenses:",
      error.response?.data || error.message
    );
    console.error("Error fetching expenses:", error);
    return [];
  }
};

export const handleExpenseButtonClick = async () => {
  return await getExpense(); // Reuse getExpense function
};

export const deleteExpenseById = async (expenseId) => {
  // Pass the expenseId as an argument
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user) {
    message.error("No user found in sessionStorage.");
    return;
  }

  try {
    await axios.delete(`${API}/expense/${expenseId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`, // Send token if authentication is needed
      },
    });
    console.log("expense deleted : ", expenseId);
    // Optionally update local storage or UI here to reflect the deletion
  } catch (error) {
    console.log("Error deleting expense", error);
    message.error("There was an error deleting the expense.");
  }
};

export const deleteAllExpenses = async () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user) {
    message.error("No user found in sessionStorage.");
    return;
  }

  const userId = user._id; // Get the userId from the stored user data

  try {
    await axios.delete(`${API}/expense/deleteAll/${userId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`, // Send token if authentication is needed
      },
    });
    console.log("All expenses deleted");
    // message.success("All expenses deleted successfully");
  } catch (error) {
    console.log("Error deleting expenses", error);
    message.error("There was an error deleting all expenses.");
  }
};

// SEARCH EXPENSES BY EXPENSE NAME

export const searchExpensesByExpenseName = async (userId, expenseName) => {
  try {
    console.log("Initiating search for expenses...");
    if (!userId || !expenseName) {
      throw new Error("Missing userId or expenseName");
    }

    const response = await axios.get(`${API}/${userId}/expenses`, {
      params: { expenseName },
    });

    console.log("Search successful. Data received:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in searchExpensesByExpenseName:", error.message);
    throw error;
  }
};

// EDIT EXPENSE

export const expenseEdit = async (expenseId, updatedExpense) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user) {
    message.error("No user found in sessionStorage.");
    return;
  }

  try {
    // Send updated expense data to the backend
    const response = await axios.put(
      `${API}/expense/${expenseId}`,
      {
        expname: updatedExpense.expname,
        expamount: updatedExpense.expamount,
        expamounttype: updatedExpense.expamounttype,
        expdate: updatedExpense.expdate,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (response.data.success) {
      message.success("Expense updated successfully!");
      return response.data.updatedExpense; // Assuming the backend returns the updated expense
    } else {
      throw new Error("Failed to update expense");
    }
  } catch (error) {
    console.log("Error editing expense", error);
    message.error("There was an error editing the expense.");
  }
};
