import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import CommonButton from "../CommonComponents/Button";
import CommonRadioButton from "../CommonComponents/Button";

const PieCharts = ({ data }) => {
  const [view, setView] = useState("country");

  const countOccurrences = (dataArray) => {
    const counts = {};
    dataArray.forEach((item) => {
      counts[item] = (counts[item] || 0) + 1;
    });
    return counts;
  };

  const allCountries = data.flatMap((movie) => movie.country);
  const allLanguages = data.flatMap((movie) => movie.language);

  const countryCounts = countOccurrences(allCountries);
  const languageCounts = countOccurrences(allLanguages);

  const countryData = {
    labels: Object.keys(countryCounts),
    datasets: [
      {
        data: Object.values(countryCounts),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
          "#E7E9ED", "#8A2BE2", "#00FF7F",
        ],
      },
    ],
  };
  const options = {
    layout: {
      padding: {
        top: 20,
        bottom: 45,
        left: -10,
        right: 15,
      },
    },
    plugins: {
      title: {
        display: true,       
        font: {
          size: 18,
          weight: "bold",
          family: "Arial",
        },
        padding: {
          top: 15,
          bottom: 15,
        },
      },
      legend: {
        position: "left",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 25,             
          color: "rgba(0, 0, 0, 0.87)",
          font: {
            size: 14,
            family: "Arial",
            weight: "normal",
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  
   
  };
  const languageData = {
    labels: Object.keys(languageCounts),
    datasets: [
      {
        data: Object.values(languageCounts),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
          "#E7E9ED", "#8A2BE2", "#00FF7F",
        ],
      },
    ],
  };

  return (
    <div className="">
      <div className=" flex justify-between">
        <div>
          {" "}
          <CommonRadioButton
            label={"Country Insights"}
            checked={view === "country"}
            onClick={() => setView("country")}
          />
          <CommonRadioButton
            checked={view === "language"}
            onClick={() => setView("language")}
            label={"language Insights"}
          />
        </div>
        <h3 className="text-center text-xl font-semibold mb-4">
          {view === "country" ? "Country Insights" : "Language Insights"}
        </h3>
      </div>

      <div className=" h-[364px]">
        <Pie
          data={view === "country" ? countryData : languageData}
          options={options}
        />
      </div>
    </div>
  );
};

export default PieCharts;
