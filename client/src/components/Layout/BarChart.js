import React from "react";
import { Bar } from "react-chartjs-2"; // Import Bar chart from react-chartjs-2
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register chart elements
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const BarChart = ({ data }) => {
  // Prepare the data for the bar chart
  const chartData = {
    labels: data.map((item) => item.expname), // Expense names (e.g., Rent, Food, etc.)
    datasets: [
      {
        label: "Expense Amount (INR)", // Label for the bars
        data: data.map((item) => item.expamount), // Expense amounts
        backgroundColor: "#4CAF50", // Bar color (Green)
        borderColor: "#388E3C", // Border color
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Expense Breakdown",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Expense Categories",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount (INR)",
        },
      },
    },
  };

  <Bar data={chartData} options={chartOptions} />;

  return <Bar data={chartData} options={{ responsive: true }} />;
};

export default BarChart;
