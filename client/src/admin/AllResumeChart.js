import React from "react";
import { Bar } from "react-chartjs-2";

const AllResumeChart = ({ labels, dataSets }) => {
  const getStepSize = () => {
    let step = Math.max(...dataSets) / 5;
    return Math.ceil(step);
  };
  const data = {
    // prettier-ignore
    labels: labels.length !==0 ?labels : ["date", "date", "date", "date", "date"],

    datasets: [
      {
        label: "Total Resumes",
        // prettier-ignore
        data: dataSets.length !==0 ? dataSets :[0, 0, 0, 0, 0],
        backgroundColor: "rgb(0,96,100)",
      },
    ],
  };
  const options = {
    title: {
      display: true,
      text: "Total Resume of Previous 5 Months",
      position: "bottom",
      fontColor: "#ff4500",
      fontSize: 15,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            stepSize: getStepSize(),
          },
        },
      ],
    },
    animation: {
      easing: "linear",
    },
  };

  return (
    <Bar
      data={data}
      options={options}
      height={window.screen.width >= 1366 ? 200 : 250}
    />
  );
};

export default AllResumeChart;
