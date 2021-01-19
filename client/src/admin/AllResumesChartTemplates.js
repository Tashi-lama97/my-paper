import React from "react";
import { Polar } from "react-chartjs-2";

const AllResumesChartTemplates = ({ dataSets }) => {
  const getStepSize = () => {
    let step = Math.max(...dataSets) / 5;
    return Math.ceil(step);
  };
  const data = {
    labels: [
      "Basic",
      "Basic Colors",
      "The Advance",
      "The More Advance",
      "Beauty of Simplicity",
      "The Funk",
    ],
    datasets: [
      {
        data: dataSets.length !== 0 ? dataSets : [0, 0, 0, 0, 0, 0],

        backgroundColor: [
          "rgba(79,195,247,1)",
          "rgba(255,238,88,1)",
          "rgba(255,138,101, 1)",
          "rgba(144,164,174, 1)",
          "rgba(186,104,200, 1)",
          "rgba(159,168,218, 1)",
        ],
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Template Usage",
      fontColor: "#ff4500",
      fontSize: 15,
    },
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 15,
      },
    },
    scale: {
      ticks: {
        stepSize: getStepSize(),
      },
    },
  };
  return (
    <Polar
      data={data}
      options={options}
      height={window.screen.width === 1366 ? 280 : 270}
    />
  );
};

export default AllResumesChartTemplates;
