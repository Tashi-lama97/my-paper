import React, { useEffect, useState } from "react";
import { isAutheticated } from "../auth/helper";
import { deleteResume, getResumesByUser } from "./helper/userAPICalls";
import BaseWrapper from "../core/BaseWrapper";
import "./css/myResumes.css";
import M from "materialize-css";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const MyResumes = () => {
  const { token, user } = isAutheticated();
  const [resumes, setResumes] = useState([]);
  const [fixResumes, setFixResumes] = useState([]);
  const [indicators, setIndicators] = useState({
    loading: "",
    success: "",
    error: "",
  });
  const { loading, success, error } = indicators;

  const [del, setDel] = useState({
    errorDel: "",
    successDel: "",
    refetch: false,
  });

  const { errorDel, successDel, refetch } = del;

  //ERROR MESSAGE
  useEffect(() => {
    if (errorDel) {
      M.toast({ html: errorDel, classes: "red darken-4" });
    }
  }, [errorDel]);

  // SUCCESS MESSAGE
  useEffect(() => {
    if (successDel) {
      M.toast({ html: "Successfully Deleted", classes: "green darken-4" });
    }
  }, [successDel]);

  //FETCHING RESUMES
  useEffect(() => {
    setIndicators({ ...indicators, loading: true, success: "" });
    setTimeout(() => {
      getResumesByUser(token, user.id).then((data) => {
        if (data.error) {
          setIndicators({
            ...indicators,
            error: data.error,
            loading: false,
          });
        } else {
          setFixResumes(data);
          setResumes(data);
          setIndicators({
            ...indicators,
            loading: false,
            success: true,
            error: "",
          });
        }
      });
    }, 100);

    //eslint-disable-next-line
  }, [refetch]);

  // Materealize options
  useEffect(() => {
    let elems = document.querySelectorAll("select");
    let instances = M.FormSelect.init(elems, {});
    return () => {
      instances.map((instance) => {
        return instance.destroy();
      });
    };
  }, []);

  const deleteCon = (resumeId) => (e) => {
    e.preventDefault();
    let result = window.confirm("Are you sure you want to delete resume");
    if (result) {
      setDel({ ...del, errorDel: "", successDel: "" });
      deleteResume(token, user.id, resumeId).then((data) => {
        if (data.error) {
          setDel({ ...del, errorDel: data.error, successDel: false });
        } else {
          setDel({
            ...del,
            errorDel: false,
            successDel: data.message,
            refetch: !refetch,
          });
        }
      });
    }
  };

  const getComponent = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan="5">
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </td>
        </tr>
      );
    } else if (success) {
      if (resumes.length !== 0) {
        return resumes.map((resume, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{resume.firstname + " " + resume.lastname}</td>
              <td>{getResumeType(resume.resumeTemplate)}</td>
              <td>
                {resume.date ? getDateinFormat(new Date(resume.date)) : ""}
              </td>
              <td className="action-section">
                <Link className="btn-flat" to={`/user/download/${resume._id}`}>
                  <i className="fas fa-file-download my-resume-download-icon"></i>
                </Link>
                <Link to={`/user/updateresume/${resume._id}`}>
                  <i className="fas fa-edit my-resume-edit-icon text-blue"></i>
                </Link>
                <button className="btn-flat" onClick={deleteCon(resume._id)}>
                  <i className="fas fa-trash-alt  red-text darken-4"></i>
                </button>
              </td>
            </tr>
          );
        });
      } else {
        return (
          <tr>
            <td colSpan="5" className="center">
              No Data Found
            </td>
          </tr>
        );
      }
    }
  };

  const getResumeType = (templateId) => {
    switch (templateId) {
      case 1:
        return "Basic";
      case 2:
        return "Basic Colors";
      case 3:
        return "The Advance";
      case 4:
        return "The More Advance";
      case 5:
        return "Beauty of Simplicity";
      case 6:
        return "The Funk";

      default:
        break;
    }
  };
  const getDateinFormat = (date) => {
    const shortMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let newDate =
      date.getDate() +
      "-" +
      shortMonths[date.getMonth()] +
      "-" +
      date.getFullYear();
    return newDate;
  };

  const mainTable = (
    <table className="highlight responsive-table my-resume-main-table">
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Name</th>
          <th>Template</th>
          <th>Date of Creation</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>{getComponent()}</tbody>
    </table>
  );

  //FILTER
  const setFillter = (field) => (e) => {
    let tempArray = [];
    e.preventDefault();
    switch (field) {
      case "template":
        tempArray = fixResumes.filter(
          (resumes) => resumes.resumeTemplate === parseInt(e.target.value)
        );
        setResumes(tempArray);
        break;

      case "date":
        if (e.target.value === "today") {
          tempArray = fixResumes.filter(
            (resumes) =>
              new Date(resumes.date).getDate() === new Date().getDate() &&
              new Date(resumes.date).getMonth() === new Date().getMonth() &&
              new Date(resumes.date).getFullYear() === new Date().getFullYear()
          );
          setResumes(tempArray);
        } else if (e.target.value === "last7Days") {
          tempArray = fixResumes.filter(
            (resumes) =>
              new Date(resumes.date).getDate() >= new Date().getDate() - 7 &&
              new Date(resumes.date).getDate() <= new Date().getDate() &&
              new Date(resumes.date).getMonth() === new Date().getMonth() &&
              new Date(resumes.date).getFullYear() === new Date().getFullYear()
          );
          setResumes(tempArray);
        } else if (e.target.value === "thisMonth") {
          tempArray = fixResumes.filter(
            (resumes) =>
              new Date(resumes.date).getMonth() === new Date().getMonth() &&
              new Date(resumes.date).getFullYear() === new Date().getFullYear()
          );
          setResumes(tempArray);
        } else if (e.target.value === "thisYear") {
          tempArray = fixResumes.filter(
            (resumes) =>
              new Date(resumes.date).getFullYear() === new Date().getFullYear()
          );
          setResumes(tempArray);
        }
        break;

      default:
        break;
    }
  };
  const clearFilter = (e) => {
    e.preventDefault();
    setResumes(fixResumes);
  };
  //FILTER OPTIONS
  const templateOptions = [
    { value: 1, tag: "Basic" },
    { value: 2, tag: "Basic Colors" },
    { value: 3, tag: "The Advance" },
    { value: 4, tag: "The More Advance" },
    { value: 5, tag: "Beauty of Simplicity" },
    { value: 6, tag: "The Funk" },
  ];
  const dateOptions = [
    { value: "today", tag: "Today" },
    { value: "last7Days", tag: "Last 7 Days" },
    { value: "thisMonth", tag: "This Month" },
    {
      value: "thisYear",
      tag: "This Year",
    },
  ];

  const getFilters = (
    <Fragment>
      <div className="input-field col s6 m2">
        <select
          value="hi"
          onChange={setFillter("template")}
          className="reset-filter"
        >
          <option value="">Select one</option>
          {templateOptions.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.tag}
              </option>
            );
          })}
        </select>
        <label>By Template Type</label>
      </div>
      <div className="input-field col s6 m2">
        <select value="" onChange={setFillter("date")} className="reset-filter">
          <option value="">Select one</option>
          {dateOptions.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.tag}
              </option>
            );
          })}
        </select>
        <label>By Date</label>
      </div>
      <div className="col s12 m2 center my-resume-filter-clear-col">
        <button
          onClick={clearFilter}
          className="waves-effect waves-light btn my-resume-filter-clear"
        >
          Clear
        </button>
      </div>
    </Fragment>
  );

  //SORT
  const setSort = (e) => {
    e.preventDefault();
    let tempArray = [];
    let sort = e.target.value;
    switch (sort) {
      case "byNameA_Z":
        tempArray = [...resumes].sort((a, b) =>
          a.firstname > b.firstname ? 1 : b.firstname > a.firstname ? -1 : 0
        );
        setResumes(tempArray);
        break;
      case "byNameZ_A":
        tempArray = [...resumes].sort((a, b) =>
          a.firstname > b.firstname ? -1 : b.firstname > a.firstname ? 1 : 0
        );
        setResumes(tempArray);
        break;
      case "byDateAsc":
        tempArray = [...resumes].sort((a, b) =>
          new Date(a.date) > new Date(b.date)
            ? 1
            : new Date(b.date) > new Date(a.date)
            ? -1
            : 0
        );
        setResumes(tempArray);
        break;
      case "byDateDesc":
        tempArray = [...resumes].sort((a, b) =>
          new Date(a.date) > new Date(b.date)
            ? -1
            : new Date(b.date) > new Date(a.date)
            ? 1
            : 0
        );
        setResumes(tempArray);
        break;

      default:
        break;
    }
  };
  const sortOptions = [
    { value: "byNameA_Z", tag: "By Name A-Z" },
    { value: "byNameZ_A", tag: "By Name Z-A" },
    { value: "byDateAsc", tag: "By Date (Ascending)" },
    { value: "byDateDesc", tag: "By Date (Descending)" },
  ];
  const getSort = (
    <Fragment>
      <div className="input-field col s6 m2">
        <select value="hi" onChange={setSort} className="reset-filter">
          <option value="">Select one</option>
          {sortOptions.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.tag}
              </option>
            );
          })}
        </select>
        <label>Sort By</label>
      </div>
      <div className="col s6 m2 center my-resume-filter-clear-col">
        <button
          onClick={clearFilter}
          className="waves-effect waves-light btn my-resume-filter-clear"
        >
          Clear
        </button>
      </div>
    </Fragment>
  );

  return (
    <BaseWrapper>
      <div className="my-resume-main-wrapper">
        <div className="my-resume-main-heading">My Resumes</div>
        <div className="row">
          <div className="row my-resume-filter-row ">
            <div className="col s12 my-resume-filter-heading ">Filters</div>
            {getFilters}
          </div>
          <div className="row my-resume-sort-row">
            <div className="col s12 my-resume-filter-heading ">Sort</div>
            {getSort}
          </div>

          <div className="col s12 m12 my-resume-main-table-section">
            {mainTable}
          </div>
        </div>
      </div>
    </BaseWrapper>
  );
};

export default MyResumes;
