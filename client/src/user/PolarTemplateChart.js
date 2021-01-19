import React from "react";
import { Polar } from "react-chartjs-2";

const PolarTemplatChart = ({ dataSets }) => {
  let realDataSets = dataSets;
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
        data: realDataSets,

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
  };
  return (
    <Polar
      data={data}
      options={options}
      height={window.screen.width === 1366 ? 295 : 270}
    />
  );
};

export default PolarTemplatChart;
