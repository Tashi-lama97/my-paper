import React, { Fragment, useEffect, useState } from "react";
import { isAutheticated } from "../auth/helper";
import BaseWrapper from "../core/BaseWrapper";
import NumberCard from "../core/NumberCard";
import AllResumeChart from "./AllResumeChart";
import AllResumesChartTemplates from "./AllResumesChartTemplates";
import "./css/adminDashboard.css";
import { getAllResumes, getAllUsers } from "./helper/apicalls";
import HourResumeChart from "./HourResumeChart";
import RegistrationActivityChart from "./RegistrationActivityChart";
import UsersChart from "./UsersChart";
import VerificationHourlyChart from "./VerificationHourlyChart";
import M from "materialize-css";

const DashboardAdmin = () => {
  const { token, user } = isAutheticated();
  const [resumes, setResumes] = useState([]);
  const [users, setUsers] = useState([]);
  const [indicators, setIndicators] = useState({
    loading: "",
    success: "",
    error: "",
  });
  const { loading, success, error } = indicators;

  const [rindicators, setRindicators] = useState({
    rloading: "",
    rsuccess: "",
    rerror: "",
  });
  const { rloading, rsuccess, rerror } = rindicators;

  const [userInfo, setUserInfo] = useState({
    last5HourTotalUsers: [],
    last5HourVerified: [],
    last5HourUnverified: [],
    totalUser: 0,
    totalVerified: 0,
    totalUnverified: 0,
    totalUserToday: 0,
    totalUnverifiedToday: 0,
    totalVerifiedToday: 0,
    prvious5Monthlabels: [],
    prvious5totalUser: [],
    prvious5totalUnverified: [],
    prvious5totalVerified: [],
  });

  const {
    last5HourTotalUsers,
    last5HourUnverified,
    last5HourVerified,
    totalUser,
    totalUnverified,
    totalVerified,
    totalUserToday,
    totalUnverifiedToday,
    totalVerifiedToday,
    prvious5Monthlabels,
    prvious5totalUser,
    prvious5totalUnverified,
    prvious5totalVerified,
  } = userInfo;

  const [resumeInfo, setResumeInfo] = useState({
    totalResumes: 0,
    totalResumesToday: 0,
    previous5HoursResumesCount: [],
    resumesTemplateCount: [],
    previous5MonthResumesLabels: [],
    previous5MonthResumesCount: [],
  });
  const {
    totalResumes,
    totalResumesToday,
    previous5HoursResumesCount,
    resumesTemplateCount,
    previous5MonthResumesLabels,
    previous5MonthResumesCount,
  } = resumeInfo;

  //FETCHING USERS
  useEffect(() => {
    setIndicators({ ...indicators, loading: true, success: "", error: "" });
    getAllUsers(token, user.id).then((data) => {
      if (data.error) {
        setIndicators({
          ...indicators,
          loading: "",
          seccess: "",
          error: data.error,
        });
        console.log("error Featching Users");
      } else {
        setIndicators({ ...indicators, loading: "", error: "", success: true });
        setUsers(data);
      }
    });
    //eslint-disable-next-line
  }, []);

  //FETCHING RESUMES
  useEffect(() => {
    setRindicators({
      ...rindicators,
      rloading: true,
      rsuccess: "",
      rerror: "",
    });
    getAllResumes(token, user.id).then((data) => {
      if (data.error) {
        setRindicators({
          ...rindicators,
          rloading: "",
          rsuccess: "",
          rerror: data.error,
        });
      } else {
        setRindicators({
          ...rindicators,
          rloading: "",
          rsuccess: true,
          rerror: "",
        });
        setResumes(data);
      }
    });
    //eslint-disable-next-line
  }, []);

  const formatDate = (date, type) => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    switch (type) {
      case "full":
        return dd + "/" + mm + "/" + yyyy;
      case "monthYear":
        return mm + "/" + yyyy;
      case "year":
        return yyyy;
      case "month":
        return mm;
      case "date":
        return dd;

      default:
        break;
    }
  };

  const getUserInfo = (type) => {
    let tempArray = [];
    let val;
    switch (type) {
      case "last5HourTotalUsers":
        for (let i = 0; i <= 4; i++) {
          let val;
          val = users.filter(
            (user) =>
              new Date(user.createdAt).getHours() ===
                new Date(
                  new Date().setHours(new Date().getHours() - (i + 1))
                ).getHours() &&
              formatDate(new Date(user.createdAt), "full") ===
                formatDate(new Date(), "full")
          ).length;
          tempArray.unshift(val);
        }
        return tempArray;
      case "last5HourUnverified":
        for (let i = 0; i <= 4; i++) {
          let val;
          val = users.filter(
            (user) =>
              new Date(user.createdAt).getHours() ===
                new Date(
                  new Date().setHours(new Date().getHours() - (i + 1))
                ).getHours() &&
              formatDate(new Date(user.createdAt), "full") ===
                formatDate(new Date(), "full") &&
              user.verified === false
          ).length;
          tempArray.unshift(val);
        }
        return tempArray;
      case "last5HourVerified":
        for (let i = 0; i <= 4; i++) {
          let val;
          val = users.filter(
            (user) =>
              new Date(user.createdAt).getHours() ===
                new Date(
                  new Date().setHours(new Date().getHours() - (i + 1))
                ).getHours() &&
              formatDate(new Date(user.createdAt), "full") ===
                formatDate(new Date(), "full") &&
              user.verified === true
          ).length;
          tempArray.unshift(val);
        }
        return tempArray;

      case "totalUserToday":
        val = users.filter(
          (user) =>
            formatDate(new Date(user.createdAt), "full") ===
            formatDate(new Date(), "full")
        ).length;
        return val;
      case "totalUnverifiedToday":
        val = users.filter(
          (user) =>
            formatDate(new Date(user.createdAt), "full") ===
              formatDate(new Date(), "full") && user.verified === false
        ).length;
        return val;
      case "totalVerifiedToday":
        val = users.filter(
          (user) =>
            formatDate(new Date(user.createdAt), "full") ===
              formatDate(new Date(), "full") && user.verified === true
        ).length;
        return val;

      case "totalUser":
        val = users.length;
        return val;
      case "totalUnverified":
        val = users.filter((user) => user.verified === false).length;
        return val;
      case "totalVerified":
        val = users.filter((user) => user.verified === true).length;
        return val;

      case "prvious5Monthlabels":
        for (let i = 0; i <= 4; i++) {
          let val;
          val = formatDate(
            new Date(new Date().setMonth(new Date().getMonth() - i)),
            "monthYear"
          );
          tempArray.unshift(val);
        }

        return tempArray;

      case "prvious5totalUser":
        for (let i = 0; i <= 4; i++) {
          let val;
          val = users.filter(
            (user) =>
              formatDate(new Date(user.createdAt), "monthYear") ===
              formatDate(
                new Date(new Date().setMonth(new Date().getMonth() - i)),
                "monthYear"
              )
          ).length;

          tempArray.unshift(val);
        }

        return tempArray;

      case "prvious5totalUnverified":
        for (let i = 0; i <= 4; i++) {
          let val;
          val = users.filter(
            (user) =>
              formatDate(new Date(user.createdAt), "monthYear") ===
                formatDate(
                  new Date(new Date().setMonth(new Date().getMonth() - i)),
                  "monthYear"
                ) && user.verified === false
          ).length;

          tempArray.unshift(val);
        }

        return tempArray;
      case "prvious5totalVerified":
        for (let i = 0; i <= 4; i++) {
          let val;
          val = users.filter(
            (user) =>
              formatDate(new Date(user.createdAt), "monthYear") ===
                formatDate(
                  new Date(new Date().setMonth(new Date().getMonth() - i)),
                  "monthYear"
                ) && user.verified === true
          ).length;

          tempArray.unshift(val);
        }

        return tempArray;
      default:
        break;
    }
  };

  // SETTING USERINFO
  useEffect(() => {
    if (error) {
      M.toast({ html: "Error Fetching Data", classes: "red darken-4" });
    } else {
      if (users.length !== 0) {
        setUserInfo({
          ...userInfo,
          last5HourTotalUsers: getUserInfo("last5HourTotalUsers"),
          last5HourUnverified: getUserInfo("last5HourUnverified"),
          last5HourVerified: getUserInfo("last5HourVerified"),
          totalUserToday: getUserInfo("totalUserToday"),
          totalUnverifiedToday: getUserInfo("totalUnverifiedToday"),
          totalVerifiedToday: getUserInfo("totalVerifiedToday"),
          totalUser: getUserInfo("totalUser"),
          totalUnverified: getUserInfo("totalUnverified"),
          totalVerified: getUserInfo("totalVerified"),
          prvious5Monthlabels: getUserInfo("prvious5Monthlabels"),
          prvious5totalUser: getUserInfo("prvious5totalUser"),
          prvious5totalUnverified: getUserInfo("prvious5totalUnverified"),
          prvious5totalVerified: getUserInfo("prvious5totalVerified"),
        });
      }
    }

    //eslint-disable-next-line
  }, [users, error]);

  const getResumeInfo = (type) => {
    let tempArray = [];
    let val;
    switch (type) {
      case "totalResumesToday":
        val = resumes.filter(
          (resume) =>
            formatDate(new Date(resume.date), "full") ===
            formatDate(new Date(), "full")
        ).length;
        return val;
      case "previous5HoursResumesCount":
        for (let i = 0; i <= 4; i++) {
          let val;
          val = resumes.filter(
            (resume) =>
              new Date(resume.date).getHours() ===
                new Date(
                  new Date().setHours(new Date().getHours() - (i + 1))
                ).getHours() &&
              formatDate(new Date(resume.date), "full") ===
                formatDate(new Date(), "full")
          ).length;
          tempArray.unshift(val);
        }
        return tempArray;

      case "totalResumes":
        val = resumes.length;
        return val;

      case "previous5MonthResumesLabels":
        for (let i = 0; i <= 4; i++) {
          let val;
          val = formatDate(
            new Date(new Date().setMonth(new Date().getMonth() - i)),
            "monthYear"
          );
          tempArray.unshift(val);
        }

        return tempArray;

      case "previous5MonthResumesCount":
        for (let i = 0; i <= 4; i++) {
          let val;
          val = resumes.filter(
            (resume) =>
              formatDate(new Date(resume.date), "monthYear") ===
              formatDate(
                new Date(new Date().setMonth(new Date().getMonth() - i)),
                "monthYear"
              )
          ).length;

          tempArray.unshift(val);
        }

        return tempArray;
      case "resumesTemplateCount":
        for (let i = 1; i <= 6; i++) {
          let val;
          val = resumes.filter((resume) => resume.resumeTemplate === i).length;
          tempArray.push(val);
        }
        return tempArray;
      default:
        break;
    }
  };

  //SETTING RESUMEINFO
  useEffect(() => {
    if (rerror) {
      M.toast({ html: "Error Fetching Data", classes: "red darken-4" });
    } else {
      if (resumes.length !== 0) {
        setResumeInfo({
          ...resumeInfo,
          totalResumesToday: getResumeInfo("totalResumesToday"),
          previous5HoursResumesCount: getResumeInfo(
            "previous5HoursResumesCount"
          ),
          totalResumes: getResumeInfo("totalResumes"),
          resumesTemplateCount: getResumeInfo("resumesTemplateCount"),
          previous5MonthResumesLabels: getResumeInfo(
            "previous5MonthResumesLabels"
          ),
          previous5MonthResumesCount: getResumeInfo(
            "previous5MonthResumesCount"
          ),
        });
      }
    }
    //eslint-disable-next-line
  }, [resumes, rerror]);

  const currentDayData = (
    <Fragment>
      <div className="row">
        <div className="col s12">
          <div className="row">
            <div className="col s12 m6">
              <div className="card">
                <div className="card-content chartWrapper">
                  <RegistrationActivityChart totalUsers={last5HourTotalUsers} />
                </div>
              </div>
            </div>
            <div className="col s12 m6">
              <div className="card">
                <div className="card-content chartWrapper">
                  <VerificationHourlyChart
                    unVerifiedUsers={last5HourUnverified}
                    verifiedUsers={last5HourVerified}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col s12">
          <div className="row numberCardSecttion">
            <div className="col s12 m4 numberCardBox">
              <NumberCard
                totalCount={totalUserToday}
                numberColor="#006064"
                cardHeading="Total Users Today"
                borderColor="#006064"
                textColor="#006064"
                iconName="fas fa-users"
              />
            </div>
            <div className="col s12 m4 numberCardBox">
              <NumberCard
                totalCount={totalVerifiedToday}
                numberColor="#388e3c"
                cardHeading="Verified Users Today"
                borderColor="#388e3c"
                textColor="#388e3c"
                iconName="fas fa-user-check"
              />
            </div>
            <div className="col s12 m4 numberCardBox">
              <NumberCard
                totalCount={totalUnverifiedToday}
                numberColor="#e53935"
                cardHeading="Unverified Users Today"
                borderColor="#e53935"
                textColor="#e53935"
                iconName="fas fa-user-times"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m4 offset-m1">
          <div className="row numberCardSection">
            <div className="cardSpacer hide-on-small-only"></div>
            <div className="col s12 numberCardBox">
              <NumberCard
                totalCount={totalResumesToday}
                numberColor="#263238 "
                cardHeading="Total Resumes Today"
                borderColor="#263238 "
                textColor="#263238 "
                iconName="fas fa-file-pdf"
              />
            </div>
          </div>
        </div>
        <div className="col s12 m6 offset-m1">
          <div className="card">
            <div className="card-content chartWrapper">
              <HourResumeChart resumeData={previous5HoursResumesCount} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );

  const totalDataRepresentation = (
    <Fragment>
      <div className="row ">
        <div className="col s12 m9 barChartSection">
          <div className="card">
            <div className="card-content chartWrapper">
              <UsersChart
                labels={prvious5Monthlabels}
                totalUsers={prvious5totalUser}
                totalUnverified={prvious5totalUnverified}
                totalVerified={prvious5totalVerified}
              />
            </div>
          </div>
        </div>
        <div className="col s12 m3">
          <div className="row numberCardSecttion">
            <div className="col s12 numberCardBox">
              <NumberCard
                totalCount={totalUser}
                numberColor="#006064"
                cardHeading="Total Users"
                borderColor="#006064"
                textColor="#006064"
                iconName="fas fa-users"
              />
            </div>
            <div className="col s12 numberCardBox">
              <NumberCard
                totalCount={totalVerified}
                numberColor="#388e3c"
                cardHeading="Verified Users"
                borderColor="#388e3c"
                textColor="#388e3c"
                iconName="fas fa-user-check"
              />
            </div>

            <div className="col s12 numberCardBox">
              <NumberCard
                totalCount={totalUnverified}
                numberColor="#e53935"
                cardHeading="Unverified Users"
                borderColor="#e53935"
                textColor="#e53935"
                iconName="fas fa-user-times"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m6">
          <div className="card">
            <div className="card-content chartWrapper">
              <AllResumeChart
                labels={previous5MonthResumesLabels}
                dataSets={previous5MonthResumesCount}
              />
            </div>
          </div>
          <div className="row numberCardSecttion">
            <div className="col s12 m6 offset-m3 numberCardBox">
              <NumberCard
                totalCount={totalResumes}
                numberColor="#006064"
                cardHeading="Total Resumes"
                borderColor="#006064"
                textColor="#006064"
                iconName="fas fa-file-pdf"
              />
            </div>
          </div>
        </div>
        <div className="col s12 m6">
          <div className="card">
            <div className="card-content chartWrapper">
              <AllResumesChartTemplates dataSets={resumesTemplateCount} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );

  return (
    <BaseWrapper>
      <div className="row adminDash-wrapper">
        <div className="col s12 adminDash-wrapper-title">Dashboard</div>
        <div className="col s12">{currentDayData}</div>
        <div className="col s12">{totalDataRepresentation}</div>
      </div>
    </BaseWrapper>
  );
};

export default DashboardAdmin;
