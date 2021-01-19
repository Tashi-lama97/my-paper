import React from "react";
import { Line } from "react-chartjs-2";

const TotalResumeChart = ({ labels, dataSets, maxTicks }) => {
  const mainData = dataSets.length !== 0 ? dataSets : [0, 0, 0, 0, 0, 0];

  const data = {
    labels: labels,
    datasets: [
      {
        data: mainData,
        borderColor: ["rgba(255,138,101, 1)"],
        backgroundColor: ["rgba(255,138,101, 0.0)"],
        pointBackgroundColor: "rgba(255,138,101, 1)",
        pointBorderColor: "rgba(255,138,101, 1)",
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Last 7 Days Activity",
      position: "bottom",
      fontColor: "#ff4500",
      fontSize: 15,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: parseInt(maxTicks) + 5,
            stepSize: 2,
          },
        },
      ],
    },
    animation: {
      easing: "linear",
    },
    legend: {
      display: false,
    },
  };
  return (
    <Line
      data={data}
      options={options}
      height={window.screen.width === 1366 ? 200 : 270}
    />
  );
};

export default TotalResumeChart;
