import React from "react";
import { Bar } from "react-chartjs-2";

function TotalResumeMonthBarChart({ resumes }) {
  const formatDate = (date) => {
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();

    date = mm + "/" + yyyy;
    return date;
  };
  const getLabels = () => {
    let tempArray = [];
    for (let i = 0; i <= 5; i++) {
      let d = new Date();
      d.setMonth(d.getMonth() - i);
      tempArray.unshift(formatDate(d));
    }
    return tempArray;
  };

  const getData = () => {
    let tempArray = [];
    let tempDates = getLabels();

    for (let i = 0; i <= getLabels().length - 1; i++) {
      tempArray[i] = resumes.filter(
        (resume) => formatDate(new Date(resume.date)) === tempDates[i]
      ).length;
    }

    return tempArray;
  };

  const data = {
    labels: getLabels(),

    datasets: [
      {
        data: getData(),
        backgroundColor: "rgba(121,134,203, 1)",
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Total Resume Month Wise (previous 5 months)",
      position: "bottom",
      fontColor: "#ff4500",
      fontSize: 15,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: Math.max(...getData()) + 5,
            stepSize: 1,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    animation: {
      easing: "linear",
    },
  };
  return (
    <div>
      <Bar
        data={data}
        options={options}
        height={window.screen.width === 1366 ? 200 : 270}
      />
    </div>
  );
}

export default TotalResumeMonthBarChart;
