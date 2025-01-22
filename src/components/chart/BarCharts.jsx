import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import CommonRadioButton from "../CommonComponents/Button";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  const [view, setView] = useState("year");

  const years = [...new Set(data.map((item) => item.year))];

  const nominations = years.map((year) =>
    data
      .filter((item) => item.year === year)
      .reduce((sum, item) => sum + item.oscar_nominations, 0)
  );

  const wins = years.map((year) =>
    data
      .filter((item) => item.year === year)
      .reduce((sum, item) => sum + item.oscar_winning, 0)
  );

  const categories = [
    "Best Picture",
    "Best Actor",
    "Best Supporting Actor",
    "Best Director",
    "Best Adapted Screenplay",
    "Best Cinematography",
    "Best Costume Design",
    "Best Production Design",
    "Best Film Editing",
    "Best Original Score",
    "Best Original Song",
  ];

  const winsByCategory = categories.reduce((acc, category) => {
    acc[category] = years.map((year) =>
      data
        .filter((item) => item.year === year)
        .map((item) => (item.oscar_winning_list.includes(category) ? 1 : 0))
        .reduce((sum, win) => sum + win, 0)
    );
    return acc;
  }, {});

  const chartData = {
    labels: years,
    datasets: [
      ...(view === "year"
        ? [
            {
              label: "Nominations",
              data: nominations,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Wins",
              data: wins,
              backgroundColor: "rgba(255, 159, 64, 0.6)",
              borderColor: "rgba(255, 159, 64, 1)",
              borderWidth: 1,
            },
          ]
        : []),

      ...(view === "category"
        ? categories.map((category) => ({
            label: category,
            data: winsByCategory[category],
            backgroundColor: `rgba(${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}, 0.6)`,
            borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, 1)`,
            borderWidth: 1,
          }))
        : []),
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "  ",
        },
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const year = tooltipItems[0].label;
            return `Year: ${year}`;
          },
          label: (tooltipItem) => {
            const datasetIndex = tooltipItem.datasetIndex;
            const datasetLabel = chartData.datasets[datasetIndex].label;
            const value = tooltipItem.raw;
            return `${datasetLabel}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <div className=" flex justify-between">
        {" "}
        <div className="mb-4">
          <CommonRadioButton
            label={"Wins by Year"}
            checked={view === "year"}
            onClick={() => setView("year")}
          />
          <CommonRadioButton
            checked={view === "category"}
            onClick={() => setView("category")}
            label={"Wins by Category"}
          />
        </div>
        <h3 className="text-center text-xl font-semibold mb-4">
          {view === "category" ? "Wins by Category" : "Wins by Year"}
        </h3>
      </div>

      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
