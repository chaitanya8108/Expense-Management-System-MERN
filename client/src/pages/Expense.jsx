import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteExpenseById,
  handleExpenseButtonClick,
  deleteAllExpenses,
  searchExpensesByExpenseName,
} from "../utils/ExpenseUtils"; // Importing the API function
import ErrorBoundary from "../utils/ErrorBoundary";
import { message, Modal, Input, Button, Spin } from "antd";
import "../styles/Expense.css";

const Expense = () => {
  const navigate = useNavigate();
  const [expenseArray, setExpenseArray] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    // Fetching expenses when component mounts
    const fetchExpenses = async () => {
      const expenses = await handleExpenseButtonClick(); // Get expenses from API
      if (expenses && expenses.length) {
        setExpenseArray(expenses);
        setFilteredExpenses(expenses); // Initialize filteredExpenses
      } else {
        console.log("No expenses found.");
      }
      setLoading(false); // Stop the spinner after data is fetched
    };

    fetchExpenses();
  }, []);

  const sumExpense = (expenses) => {
    return expenses.reduce((total, expense) => total + expense.expamount, 0);
  };

  const handleDashboardClick = () => {
    console.log("Navigating to dashboard with expenses:", expenseArray);
    navigate("/dashboard", {
      state: { expenses: filteredExpenses },
    });
  };

  const handleDeleteAllExpenses = () => {
    if (expenseArray.length > 0) {
      Modal.confirm({
        title: "Confirm Deletion",
        content: (
          <div style={{ fontSize: "16px", margin: "10px 0" }}>
            This action will delete all expenses. Are you sure you want to
            proceed?
          </div>
        ),
        okText: "Yes",
        cancelText: "No",
        onOk: () => {
          deleteAllExpenses();
          setExpenseArray([]);
          setFilteredExpenses([]);
          setTimeout(() => {
            message.success("All expenses deleted successfully!");
          }, 300);
        },
        onCancel: () => {
          message.info("Deletion cancelled");
        },
      });
    } else {
      message.error("No expense to delete");
    }
  };

  const handleDeleteExpenseById = async (expenseId) => {
    try {
      console.log("Deleting expense with ID:", expenseId);
      await deleteExpenseById(expenseId);
      setExpenseArray((prev) =>
        prev.filter((expense) => expense._id !== expenseId)
      );
      setFilteredExpenses((prev) =>
        prev.filter((expense) => expense._id !== expenseId)
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleSearchClick = async () => {
    try {
      const userId = localStorage.getItem("_id");

      // Check if userId exists in localStorage
      if (!userId) {
        message.error("User ID not found in localStorage.");
        return;
      }

      console.log("userId retrieved from localStorage:", userId); // Check the userId

      // Ensure it's a string before passing to the backend
      const results = await searchExpensesByExpenseName(userId, searchQuery);
      setFilteredExpenses(results);
      setIsSearchModalVisible(false);
      setSearchQuery("");
      message.success(`${results.length} Expenses found`);
    } catch (error) {
      console.error("Error searching for expenses:", error);
      message.error("No matching expenses.");
    }
  };

  const cardColor = () => {
    const colors = [
      "#ebf4f5",
      // "#e9edc9",
      // "#caf0f8",
      // "#ffcdb2",
      // "#ffe5ec",
      // "#edf6f9",
      // "#f8edeb",
      // "#fdc5f5",
      // "#cddafd",
      // "#e9f5db",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div className="expense">
      <div
        className={`leftDiv ${
          filteredExpenses.length > 0 ? "leftDivStart" : "leftDivCenter"
        }`}
      >
        {loading ? ( // Conditionally render spinner while loading
          // <Spin size="large" className="loading-spinner" />
          <ErrorBoundary>
            <lord-icon
              src="https://cdn.lordicon.com/idylhtwd.json"
              trigger="loop"
              stroke="bold"
              state="loop-cycle"
              colors="primary:#16c72e,secondary:#d1fad7"
              style={{ width: "50px", height: "50px" }}
            ></lord-icon>
          </ErrorBoundary>
        ) : filteredExpenses.length > 0 ? (
          <div className="div2">
            <strong className="font-serif mb-4">EXPENSES</strong>
            <div className="div3">
              <div className="div4">
                {filteredExpenses.map((expense) => (
                  <ul
                    key={expense._id}
                    className="expense-card border hover:shadow-xl font-serif"
                    style={{ backgroundColor: cardColor() }}
                  >
                    <div className="listDiv p-2  rounded shadow-md">
                      <li>Expense Name : {expense.expname}</li>
                      <li>Expense Amount (INR) : {expense.expamount}</li>
                      <li>Amount Category : {expense.expamounttype}</li>
                      <li>
                        Expense Date :{" "}
                        {new Date(expense.expdate).toLocaleDateString()}
                      </li>
                    </div>
                    <div className="card-operations flex flex-col justify-between items-center">
                      {/* <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteExpenseById(expense._id)}
                      >
                        delete
                      </button> */}
                      <div className="del shadow-md rounded">
                        <ErrorBoundary>
                          <lord-icon
                            src="https://cdn.lordicon.com/qrsdbrog.json"
                            trigger="loop"
                            delay="900"
                            stroke="light"
                            state="in-reveal"
                            colors="primary:#0a5c15,secondary:#e83a30,tertiary:#fad3d1"
                            style={{
                              width: "2.5rem",
                              height: "2.5rem",
                              cursor: "pointer",
                            }}
                            onClick={() => handleDeleteExpenseById(expense._id)}
                          ></lord-icon>
                        </ErrorBoundary>
                      </div>
                      <div className="edit shadow-md rounded">
                        <ErrorBoundary>
                          <lord-icon
                            src="https://cdn.lordicon.com/lsrcesku.json"
                            trigger="loop"
                            delay="900"
                            stroke="light"
                            state="in-reveal"
                            colors="primary:#0a5c15,secondary:#848484,tertiary:#9cf4a7,quaternary:#ffffff"
                            style={{
                              width: "2.5rem",
                              height: "2.5rem",
                              cursor: "pointer",
                            }}
                          ></lord-icon>
                        </ErrorBoundary>
                      </div>
                    </div>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <strong className="font-serif">No expenses found.</strong>
        )}
      </div>
      <div className="rightDiv bg-gray-100">
        <div className="searchExpense">
          <ErrorBoundary>
            <lord-icon
              src="https://cdn.lordicon.com/vgxjrbxm.json"
              trigger="loop"
              delay="700"
              state="in-reveal"
              colors="primary:#66ee78,secondary:#ee66aa"
              style={{ width: "4rem", height: "4rem", cursor: "pointer" }}
              onClick={() => setIsSearchModalVisible(true)}
            ></lord-icon>
          </ErrorBoundary>
        </div>
        <div className="expenseCalculate">
          <div className="expenseTotalDiv">
            {filteredExpenses.length ? (
              <h2 className="font-serif">
                Total Expenses: {filteredExpenses.length}
              </h2>
            ) : (
              <strong className="font-serif">No Data</strong>
            )}
            {filteredExpenses.length ? (
              <h2 className="font-serif">
                Total Expense Amount (INR): {sumExpense(filteredExpenses)}
              </h2>
            ) : (
              ""
            )}
          </div>
          <button onClick={handleDashboardClick} className="btn btn-dark">
            Dashboard
          </button>
        </div>
        <div className="deleteAll">
          <ErrorBoundary>
            <lord-icon
              src="https://cdn.lordicon.com/xekbkxul.json"
              trigger="morph"
              state="morph-trash-in"
              colors="primary:#121331,secondary:#30c9e8,tertiary:#b4b4b4,quaternary:#faddd1"
              style={{ width: "3rem", height: "3rem", cursor: "pointer" }}
              onClick={handleDeleteAllExpenses}
            ></lord-icon>
          </ErrorBoundary>
          <strong className="delAllText mb-4">
            Delete All Expenses <span>(Delete all)</span>
          </strong>
        </div>
      </div>
    </div>
  );
};

export default Expense;
