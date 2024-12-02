import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the plugin

// Register chart elements
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, ChartDataLabels);

const PieChart = ({ data }) => {
  // Prepare the data for the pie chart
  const chartData = {
    labels: data.map(item => item.expname), // Expense names (e.g., Rent, Food, etc.)
    datasets: [
      {
        data: data.map(item => item.expamount), // Expense amounts
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F0E130', '#E130F0', 'teal'], // Pie slice colors
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  // Options for the pie chart
  const chartOptions = {
    plugins: {
      datalabels: {
        color: '#fff', // Label color
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
          const percentage = ((value / total) * 100).toFixed(2); // Calculate percentage
          return `${percentage}%`; // Display percentage
        },
        font: {
          weight: 'bold',
          size: 14,
        },
        align: 'center',
        anchor: 'center',
      },
    },
  };

  return <Pie data={chartData} options={chartOptions} className='rounded'/>;
};

export default PieChart;
