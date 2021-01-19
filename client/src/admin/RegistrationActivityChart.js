import React from "react";
import { Line } from "react-chartjs-2";

const RegistrationActivityChart = ({ totalUsers }) => {
  const getStepSize = () => {
    let stepSize = Math.max(...totalUsers) / 5;
    return Math.ceil(stepSize);
  };
  const data = {
    labels: [
      "5 Hour Ago",
      "4 Hour Ago",
      "3 Hour Ago",
      "2 Hour Ago",
      "1 Hour Ago",
    ],

    datasets: [
      {
        label: "Total Users",
        data: totalUsers.length !== 0 ? totalUsers : [0, 0, 0, 0, 0],
        backgroundColor: "rgba(0,96,100,0)",
        borderColor: ["rgba(0,96,100,0.5)"],
        pointBackgroundColor: "rgba(0,96,100,1)",
        pointBorderColor: "rgba(0,96,100,1)",
      },
    ],
  };
  const options = {
    title: {
      display: true,
      text: "Last 5 Hours User Registration",
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
    <Line
      data={data}
      options={options}
      height={window.screen.width >= 1366 ? 150 : 200}
    />
  );
};

export default RegistrationActivityChart;
