// Expense Component
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleExpenseButtonClick } from "../utils/ExpenseUtils"; // Importing the API function
import ErrorBoundary from "../utils/ErrorBoundary";
import { Cursor } from "mongoose";

const Expense = () => {
  const navigate = useNavigate();
  const [expenseArray, setExpenseArray] = useState([]);

  useEffect(() => {
    // Fetching expenses when component mounts
    const fetchExpenses = async () => {
      const expenses = await handleExpenseButtonClick(); // Get expenses from API
      if (expenses && expenses.length) {
        setExpenseArray(expenses);
      } else {
        console.log("No expenses found.");
      }
    };

    fetchExpenses();
  }, []);

  const sumExpense = (expenseArray) => {
    return expenseArray.reduce(
      (total, expense) => total + expense.expamount,
      0
    );
  };

  const handleDashboardClick = () => {
    console.log("Navigating to dashboard with expenses:", expenseArray);
    navigate("/dashboard", {
      state: { expenses: expenseArray },
    });
  };

  return (
    <div className="flex lg:flex-row flex-col-reverse justify-between items-center min-w-full overflow-x-hidden">
      <div className="expTable max-h-[80vh] min-w-[70vw] flex justify-center items-start lg:overflow-y-hidden overflow-x-hidden lg:mt-0 mt-4">
        {expenseArray.length > 0 ? (
          <div className="div2 flex flex-col min-h-[70vh] items-center">
            <strong className="font-serif mb-4">EXPENSES</strong>
            <div className="div3 flex flex-row flex-wrap justify-center lg:max-h-[70vh] overflow-y-scroll scroll-smooth">
              {expenseArray.map((expense) => (
                <ul
                  key={expense._id}
                  className="rounded bg-gray-100 m-3 p-3 font-serif hover:shadow-xl hover:transition-shadow lg:max-h-[30vh] flex flex-col flex-wrap gap-5 lg:min-w-[30vw] min-w-[80%] items-center lg:items-start"
                >
                  <li>Expense Name : {expense.expname}</li>
                  <li>Expense Amount (INR) : {expense.expamount}</li>
                  <li>Amount Category : {expense.expamounttype}</li>
                  <li>
                    Expense Date :{" "}
                    {new Date(expense.expdate).toLocaleDateString()}
                  </li>
                </ul>
              ))}
            </div>
          </div>
        ) : (
          <strong className="font-serif">No expenses found.</strong>
        )}
      </div>
      <div className="min-w-[100%] lg:min-w-[20vw] md:min-w-[30vw]  pb-3 max-h-[50vh] lg:min-h-[100vh] flex flex-col justify-evenly items-center bg-gray-50 lg:gap-7 gap-4">
        <div className="lg:mt-[-10rem] flex flex-col items-center xl:w-full xl:min-h-[50%]">
          {/* <button className="btn btn-danger">Delete All</button> */}
          <ErrorBoundary>
            <lord-icon
              src="https://cdn.lordicon.com/hwjcdycb.json"
              trigger="hover"
              colors="primary:#000000,secondary:#109121"
              style={{ width: "3rem", height: "3rem", cursor: "pointer" }}
            ></lord-icon>
          </ErrorBoundary>
          <strong>Delete all Expenses</strong>
        </div>
        <div className="lg:mt-[-20rem] flex flex-col justify-center items-center lg:gap-5 xl:w-full xl:min-h-[50%]">
          <div className="flex flex-col items-center gap-3 mt-3 ">
            {expenseArray.length ? (
              <h2 className="font-serif">
                Total Expenses: {expenseArray.length}
              </h2>
            ) : (
              <strong className="font-serif">No Data</strong>
            )}
            {expenseArray.length ? (
              <h2 className="font-serif">
                Total Expense Amount (INR): {sumExpense(expenseArray)}
              </h2>
            ) : (
              ""
            )}
          </div>
          <button onClick={handleDashboardClick} className="btn btn-danger">
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Expense;
