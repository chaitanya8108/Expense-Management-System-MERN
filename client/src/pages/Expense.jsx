import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteExpenseById,
  handleExpenseButtonClick,
  deleteAllExpenses,
  searchExpensesByExpenseName,
  expenseEdit, // Importing the edit function
} from "../utils/ExpenseUtils";
import ErrorBoundary from "../utils/ErrorBoundary";
import { message, Modal, Input, Button } from "antd";
import "../styles/Expense.css";

const Expense = () => {
  const navigate = useNavigate();
  const [expenseArray, setExpenseArray] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // Edit modal state
  const [currentExpense, setCurrentExpense] = useState(null); // Currently edited expense

  useEffect(() => {
    const fetchExpenses = async () => {
      const expenses = await handleExpenseButtonClick();
      if (expenses && expenses.length) {
        setExpenseArray(expenses);
        setFilteredExpenses(expenses);
      } else {
        console.log("No expenses found.");
      }
      setLoading(false);
    };

    fetchExpenses();
  }, []);

  const sumExpense = (expenses) => {
    return expenses.reduce((total, expense) => total + expense.expamount, 0);
  };

  const handleDashboardClick = () => {
    navigate("/dashboard", {
      state: { expenses: expenseArray },
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
      await deleteExpenseById(expenseId);
      message.success("Expense deleted successfully!");
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
      const user = sessionStorage.getItem("_id");
      if (!user) {
        message.error("User ID not found in sessionStorage.");
        return;
      }

      const results = await searchExpensesByExpenseName(user, searchQuery);
      setFilteredExpenses(results);
      setIsSearchModalVisible(false);
      setSearchQuery("");
      message.success(`${results.length} Expenses found`);
    } catch (error) {
      console.error("Error searching for expenses:", error);
      message.error("No matching expenses.");
    }
  };

  const handleEditClick = (expense) => {
    setCurrentExpense(expense); // Set the selected expense for editing
    setIsEditModalVisible(true); // Open the edit modal
  };

  const handleEditSubmit = async () => {
    if (!currentExpense) return;

    try {
      // Call the expenseEdit function with the updated expense data
      const updatedExpense = await expenseEdit(
        currentExpense._id,
        currentExpense
      );

      if (updatedExpense) {
        // Update local state after successful edit
        const updatedExpenses = expenseArray.map((exp) =>
          exp._id === updatedExpense._id ? updatedExpense : exp
        );
        setExpenseArray(updatedExpenses);
        setFilteredExpenses(updatedExpenses);

        // Reset currentExpense and close the modal
        setCurrentExpense(null); // Clear the inputs
        setIsEditModalVisible(false); // Close the modal
      }
    } catch (error) {
      console.error("Error updating expense:", error);
      message.error("Failed to update expense.");
    }
  };

  const cardColor = () => {
    const colors = ["#ebf4f5"];
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
        {loading ? (
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
                    <div className="listDiv p-2 rounded shadow-md">
                      <li>Expense Name : {expense.expname}</li>
                      <li>Expense Amount (INR) : {expense.expamount}</li>
                      <li>Amount Category : {expense.expamounttype}</li>
                      <li>
                        Expense Date :{" "}
                        {new Date(expense.expdate).toLocaleDateString()}
                      </li>
                    </div>
                    <div className="card-operations flex flex-col justify-between items-center">
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
                            onClick={() => handleEditClick(expense)}
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

      {/* Edit Modal */}
      <Modal
        title="Edit Expense"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsEditModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleEditSubmit}>
            Submit
          </Button>,
        ]}
        className=""
      >
        {currentExpense && (
          <>
            <Input
              placeholder="Expense Name"
              value={currentExpense.expname}
              onChange={(e) =>
                setCurrentExpense({
                  ...currentExpense,
                  expname: e.target.value,
                })
              }
              className="mb-4  rounded p-2 shadow-md"
            />
            <Input
              placeholder="Expense Amount"
              type="number"
              value={currentExpense.expamount}
              onChange={(e) =>
                setCurrentExpense({
                  ...currentExpense,
                  expamount: Number(e.target.value),
                })
              }
              className="mb-4  rounded p-2 shadow-md"
            />
            <Input
              placeholder="Expense Category"
              value={currentExpense.expamounttype}
              onChange={(e) =>
                setCurrentExpense({
                  ...currentExpense,
                  expamounttype: e.target.value,
                })
              }
              className="mb-4 rounded p-2 shadow-md"
            />
            <Input
              placeholder="Expense Date"
              type="date"
              value={currentExpense.expdate}
              onChange={(e) =>
                setCurrentExpense({
                  ...currentExpense,
                  expdate: e.target.value,
                })
              }
              className=" rounded p-2 shadow-md"
            />
          </>
        )}
      </Modal>

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
        {/* Search Modal */}
        <Modal
          title="Search Expenses"
          open={isSearchModalVisible}
          onCancel={() => setIsSearchModalVisible(false)} // Close modal on cancel
          footer={[
            <Button key="cancel" onClick={() => setIsSearchModalVisible(false)}>
              Cancel
            </Button>,
            <Button key="search" type="primary" onClick={handleSearchClick}>
              Search
            </Button>,
          ]}
        >
          <Input
            placeholder="Enter expense name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded p-2 shadow-md"
          />
        </Modal>
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
          <strong className="delAllText mb-4">Delete All Expenses</strong>
        </div>
      </div>
    </div>
  );
};

export default Expense;
