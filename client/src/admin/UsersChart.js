import React from "react";
import { Bar } from "react-chartjs-2";

const UsersChart = ({ labels, totalUsers, totalUnverified, totalVerified }) => {
  const dataLabels =
    labels.length !== 0 ? labels : ["date", "date", "date", "date", "date"];

  const dataTotalUsers = totalUsers.length !== 0 ? totalUsers : [0, 0, 0, 0, 0];
  // prettier-ignore
  const dataTotalUnverified = totalUnverified.length !== 0 ? totalUnverified :[0, 0, 0, 0, 0];

  // prettier-ignore
  const dataTotalVerified =  totalVerified.length !== 0 ? totalVerified :[0, 0, 0, 0, 0];

  const getStepSize = () => {
    let step = Math.max(...totalUsers) / 5;
    return Math.ceil(step);
  };

  const data = {
    labels: dataLabels,

    datasets: [
      {
        label: "Total Users",
        data: dataTotalUsers,
        backgroundColor: "rgb(0,96,100)",
      },
      {
        label: "Verified Users",
        data: dataTotalVerified,
        backgroundColor: "rgb(56,142,60)",
      },
      {
        label: "Unverified Users",
        data: dataTotalUnverified,
        backgroundColor: "rgb(229,57,53)",
      },
    ],
  };
  const options = {
    title: {
      display: true,
      text: "Users Registration Previous 5 Months",
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
      height={window.screen.width >= 1366 ? 160 : 270}
    />
  );
};

export default UsersChart;
