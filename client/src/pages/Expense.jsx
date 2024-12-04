import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteExpenseById,
  handleExpenseButtonClick,
  deleteAllExpenses,
  searchExpensesByExpenseName,
} from "../utils/ExpenseUtils"; // Importing the API function
import ErrorBoundary from "../utils/ErrorBoundary";
import { message, Modal, Input, Button } from "antd";
import "../styles/Expense.css";

const Expense = () => {
  const navigate = useNavigate();
  const [expenseArray, setExpenseArray] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
      message.success("Search completed successfully!");
    } catch (error) {
      console.error("Error searching for expenses:", error);
      message.error("An error occurred while searching for expenses.");
    }
  };

  const cardColor = () => {
    const colors = [
      "#e0e1dd",
      "#e9edc9",
      "#caf0f8",
      "#ffcdb2",
      "#ffe5ec",
      "#edf6f9",
      "#f8edeb",
      "#fdc5f5",
      "#cddafd",
      "#e9f5db",
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
        {filteredExpenses.length > 0 ? (
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
                    <div>
                      <li>Expense Name : {expense.expname}</li>
                      <li>Expense Amount (INR) : {expense.expamount}</li>
                      <li>Amount Category : {expense.expamounttype}</li>
                      <li>
                        Expense Date :{" "}
                        {new Date(expense.expdate).toLocaleDateString()}
                      </li>
                    </div>
                    <div className="">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteExpenseById(expense._id)}
                      >
                        delete
                      </button>
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
          <strong className="delAllText mb-5">Delete all Expenses</strong>
        </div>
      </div>

      {/* Search Modal */}
      <Modal
        title="Search Expense"
        open={isSearchModalVisible}
        onCancel={() => setIsSearchModalVisible(false)}
        footer={null}
      >
        <Input
          placeholder="Enter expense name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          type="primary"
          style={{ marginTop: "10px" }}
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </Modal>
    </div>
  );
};

export default Expense;
