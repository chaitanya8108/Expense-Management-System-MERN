// Dashboard Component
import React from "react";
import { useLocation } from "react-router-dom";
import PieChart from "../components/Layout/PieChart";
import BarChart from "../components/Layout/BarChart";

const Dashboard = () => {
  const location = useLocation();
  const { expenses } = location.state || { expenses: [] };

  return (
    <div className="dashboard flex flex-col justify-start items-center min-h-[100vh] max-w-[100vw]">
      <strong className="font-serif align-top mt-4 mb-6">EXPENSE DASHBOARD</strong>
      <div className="flex lg:flex-row flex-col justify-center items-center min-w-[100vw] overflow-y-scroll min-h-[100vh] flex-wrap md:min-h-[100vh] sm:min-h-[100vh]">
        {expenses.length > 0 ? (
          <div className="flex flex-col lg:flex-col gap-[10rem] max-w-[100vw] p-0">
            <div style={{ width: "400px", height: "400px" }} className="overflow-x-auto">
              <PieChart data={expenses} />
            </div>
            <div style={{ width: "370px", height: "400px" }} className="overflow-x-auto lg:min-w-[600px] sm:min-w-[600px]  md:min-w-[600px]">
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
