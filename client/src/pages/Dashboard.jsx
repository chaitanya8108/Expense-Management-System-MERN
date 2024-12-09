// Dashboard Component
import React from "react";
import { useLocation } from "react-router-dom";
import PieChart from "../components/Layout/PieChart";
import BarChart from "../components/Layout/BarChart";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const location = useLocation();
  const { expenses } = location.state || { expenses: [] };

  console.log("Dashboard state:", location.state); // Debug log

  return (
    <div className="dashboard">
      <p className="dashboard-title font-serif">EXPENSE DASHBOARD</p>
      <div className="charts">
        {expenses.length > 0 ? (
          <div className="pie-bar">
            <div
              style={{ width: "400px", height: "400px" }}
              className="pie-chart"
            >
              <PieChart data={expenses} />
            </div>
            <div
              style={{ width: "370px", height: "50%" }}
              className="bar-chart"
            >
              <BarChart data={expenses} />
            </div>
          </div>
        ) : (
          <strong className="font-serif">
            No expenses to display in <b>Dashboard</b>.
          </strong>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
