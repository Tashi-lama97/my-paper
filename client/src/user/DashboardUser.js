import React, { useEffect, useState } from "react";
import { isAutheticated } from "../auth/helper";
import BaseWrapper from "../core/BaseWrapper";
import "./css/dashboard.css";
import { getResumesByUser } from "./helper/userAPICalls";
import TotalResumeChart from "./TotalResumeChart";
import PolarTemplateChart from "./PolarTemplateChart";
import TotalResumeMonthBarChart from "./TotalResumeMonthBarChart";

const DashboardUser = () => {
  const { token, user } = isAutheticated();
  const [resumes, setResumes] = useState([]);
  const [indicators, setIndicators] = useState({
    loading: "",
    success: "",
    error: "",
  });
  const { loading, error, success } = indicators;

  const [chartsData, setChartsData] = useState({
    labels: [],
    dataSets: [],
    maxTicks: "",
    templateData: [],
  });

  const { labels, dataSets, maxTicks, templateData } = chartsData;

  useEffect(() => {
    setIndicators({ ...indicators, loading: true, error: "", success: "" });
    getResumesByUser(token, user.id).then((data) => {
      if (data.error) {
        setIndicators({
          ...indicators,
          loading: false,
          error: data.error,
          success: false,
        });
      } else {
        setResumes(data);
        setIndicators({
          ...indicators,
          loading: false,
          success: true,
          error: false,
        });
      }
    });
    //eslint-disable-next-line
  }, []);

  const formatDate = (date) => {
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    date = mm + "/" + dd + "/" + yyyy;
    return date;
  };
  const getLast7Days = () => {
    let result = [];
    for (let i = 0; i < 7; i++) {
      let d = new Date();
      d.setDate(d.getDate() - i);
      result.unshift(formatDate(d));
    }

    return result;
  };

  const getData = () => {
    let tempArray = [];
    let dataLabel = getLast7Days();
    if (resumes.length !== 0) {
      for (let i = 0; i <= getLast7Days().length - 1; i++) {
        tempArray[i] = resumes.filter(
          (resume) => formatDate(new Date(resume.date)) === dataLabel[i]
        ).length;
      }
    }
    return tempArray;
  };

  const getMaxTicks = () => {
    if (getData().length !== 0) {
      return Math.max(...getData());
    }
  };

  const getTemplateData = () => {
    let tempArray = [];
    if (resumes.length !== 0) {
      for (let i = 0; i <= 5; i++) {
        tempArray[i] = resumes.filter(
          (resume) => resume.resumeTemplate === i + 1
        ).length;
      }
    }
    return tempArray;
  };

  useEffect(() => {
    if (resumes.length !== 0) {
      setChartsData({
        ...chartsData,
        labels: getLast7Days(),
        dataSets: getData(),
        maxTicks: getMaxTicks(),
        templateData: getTemplateData(),
      });
    }
    getData();
    //eslint-disable-next-line
  }, [resumes]);

  return (
    <BaseWrapper>
      <div className="dashboard-main-wrapper">
        <div className="row">
          <div className="col s12 dashboard-main-page-title">Dashboard</div>
          <div className="col s12 m7 row dashboard-right-main">
            <div className="card ">
              <div className="card-content white-text">
                <TotalResumeChart
                  labels={labels}
                  dataSets={dataSets}
                  maxTicks={maxTicks}
                />
              </div>
            </div>
          </div>
          <div className="col s12 m5 dashboard-left-main">
            <div className="card ">
              <div className="card-content white-text">
                <PolarTemplateChart dataSets={templateData} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m5 hide-on-small-only"></div>
          <div className="col s12 m7 dashboard-line-chart">
            <div className="card">
              <div className="card-content white-text dashboard-line-chart-card">
                <TotalResumeMonthBarChart resumes={resumes} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseWrapper>
  );
};

export default DashboardUser;
