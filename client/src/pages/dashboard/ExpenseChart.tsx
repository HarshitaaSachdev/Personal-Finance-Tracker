import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ExpenseChart = ({ records }) => {
  const getChartData = () => {
    const categories = records.map((record) => record.category);
    const uniqueCategories = [...new Set(categories)];

    const categoryAmounts = uniqueCategories.map((category) => {
      return records
        .filter((record) => record.category === category)
        .reduce((acc, record) => acc + record.amount, 0);
    });

    return {
      labels: uniqueCategories,
      datasets: [
        {
          data: categoryAmounts,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    };
  };

  return (
    <div className="chart-container">
      <Pie data={getChartData()} />
    </div>
  );
};

export default ExpenseChart;
