import React from "react";
import { Line } from "react-chartjs-2";

const VerificationHourlyChart = ({ unVerifiedUsers, verifiedUsers }) => {
  const getStepSize = () => {
    let stepSize = Math.max(...unVerifiedUsers, ...verifiedUsers) / 5;
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
        label: "Verified Users",
        data: verifiedUsers.length !== 0 ? verifiedUsers : [0, 0, 0, 0, 0],
        backgroundColor: "rgba(56,142,60,0)",
        borderColor: ["rgba(56,142,60,0.5)"],
        pointBackgroundColor: "rgba(56,142,60,1)",
        pointBorderColor: "rgba(56,142,60,1)",
      },
      {
        label: "Unverified Users",
        data: unVerifiedUsers.length !== 0 ? unVerifiedUsers : [0, 0, 0, 0, 0],
        backgroundColor: "rgba(229,57,53,0)",
        borderColor: ["rgba(229,57,53,0.5)"],
        pointBackgroundColor: "rgba(229,57,53,1)",
        pointBorderColor: "rgba(229,57,53,1)",
      },
    ],
  };
  const options = {
    title: {
      display: true,
      text: "Last 5 Hours User Verification Status",
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

export default VerificationHourlyChart;
