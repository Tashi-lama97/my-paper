import React, { useEffect, useState } from "react";
import { isAutheticated } from "../auth/helper";
import BaseWrapper from "../core/BaseWrapper";
import "./css/allResumes.css";
import { getAllResumes } from "./helper/apicalls";
import M from "materialize-css";

const AllResumes = () => {
  const { token, user } = isAutheticated();
  const [resumes, setResumes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [indicators, setIndicators] = useState({
    loading: "",
    success: "",
    error: "",
  });
  const { loading, error, success } = indicators;

  const [filterValue, setFilterValue] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [searchBy, setSearchBy] = useState("byUserName");

  useEffect(() => {
    setIndicators({ ...indicators, loading: true, success: "", error: "" });
    getAllResumes(token, user.id).then((data) => {
      if (data.error) {
        setIndicators({
          ...indicators,
          error: data.error,
          success: "",
          loading: "",
        });
      } else {
        setResumes(data);
        setFilteredData(data);
        setIndicators({
          ...indicators,
          error: "",
          loading: "",
          success: true,
        });
      }
    });
    //eslint-disable-next-line
  }, []);

  //CSS SELECT
  useEffect(() => {
    let elems = document.querySelectorAll("select");
    let instances = M.FormSelect.init(elems, {});

    return () => {
      instances[0].destroy();
    };
  }, []);

  useEffect(() => {
    if (searchVal.trim() === "") {
      setFilteredData(resumes);
    }
    //eslint-disable-next-line
  }, [searchVal]);

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

  const changeSearch = (e, field) => {
    switch (field) {
      case "data":
        setSearchVal(e.target.value);
        break;
      case "option":
        setSearchBy(e.target.value);
        break;

      default:
        break;
    }
  };

  const clearFilter = () => {
    setFilteredData(resumes);
    setFilterValue("");
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
  const setFilters = (e) => {
    let key = e.target.value;
    let tempArray = [];
    switch (key) {
      case "byNameA_Z":
        tempArray = [...resumes].sort((a, b) =>
          a.firstname > b.firstname ? 1 : b.firstname > a.firstname ? -1 : 0
        );
        setFilteredData(tempArray);
        break;
      case "byNameZ_A":
        tempArray = [...resumes].sort((a, b) =>
          a.firstname > b.firstname ? -1 : b.firstname > a.firstname ? 1 : 0
        );
        setFilteredData(tempArray);
        break;
      case "byDateAsc":
        tempArray = [...resumes].sort((a, b) =>
          new Date(a.date) > new Date(b.date)
            ? 1
            : new Date(b.date) > new Date(a.date)
            ? -1
            : 0
        );
        setFilteredData(tempArray);
        break;
      case "byDateDesc":
        tempArray = [...resumes].sort((a, b) =>
          new Date(a.date) > new Date(b.date)
            ? -1
            : new Date(b.date) > new Date(a.date)
            ? 1
            : 0
        );
        setFilteredData(tempArray);
        break;

      case "today":
        tempArray = resumes.filter(
          (resume) =>
            formatDate(new Date(resume.date), "full") ===
            formatDate(new Date(), "full")
        );
        setFilteredData(tempArray);
        break;
      case "last7Days":
        let n = new Date();
        n.setDate(n.getDate() - 7);
        tempArray = resumes.filter(
          (resume) =>
            formatDate(new Date(resume.date), "date") >=
              formatDate(n, "date") &&
            formatDate(new Date(resume.date), "month") ===
              formatDate(new Date(), "month") &&
            formatDate(new Date(resume.date), "year") ===
              formatDate(new Date(), "year") &&
            formatDate(new Date(resume.date), "date") <
              formatDate(new Date(), "date")
        );
        setFilteredData(tempArray);
        break;
      case "thisMonth":
        tempArray = resumes.filter(
          (resume) =>
            formatDate(new Date(resume.date), "month") ===
              formatDate(new Date(), "month") &&
            formatDate(new Date(resume.date), "year") ===
              formatDate(new Date(), "year")
        );
        setFilteredData(tempArray);
        break;
      case "year2020":
        let d = new Date();
        d.setFullYear(2020);
        tempArray = resumes.filter(
          (resume) =>
            formatDate(new Date(resume.date), "year") === formatDate(d, "year")
        );
        setFilteredData(tempArray);
        break;
      case "thisYear":
        tempArray = resumes.filter(
          (resume) =>
            formatDate(new Date(resume.date), "year") ===
            formatDate(new Date(), "year")
        );
        setFilteredData(tempArray);
        break;

      case "1":
        tempArray = resumes.filter((resume) => resume.resumeTemplate === 1);
        setFilteredData(tempArray);
        break;
      case "2":
        tempArray = resumes.filter((resume) => resume.resumeTemplate === 2);
        setFilteredData(tempArray);
        break;
      case "3":
        tempArray = resumes.filter((resume) => resume.resumeTemplate === 3);
        setFilteredData(tempArray);
        break;
      case "4":
        tempArray = resumes.filter((resume) => resume.resumeTemplate === 4);
        setFilteredData(tempArray);
        break;
      case "5":
        tempArray = resumes.filter((resume) => resume.resumeTemplate === 5);
        setFilteredData(tempArray);
        break;
      case "6":
        tempArray = resumes.filter((resume) => resume.resumeTemplate === 6);
        setFilteredData(tempArray);
        break;

      default:
        break;
    }
  };
  const setSearch = () => {
    let tempArray = [];
    if (searchVal.trim() !== "") {
      switch (searchBy) {
        case "byUserName":
          tempArray = resumes.filter((resume) =>
            resume.user.name.toLowerCase().includes(searchVal.toLowerCase())
          );
          setFilteredData(tempArray);
          break;
        case "byNameOnRsume":
          tempArray = resumes.filter((resume) =>
            (
              resume.firstname.toLowerCase() +
              " " +
              resume.lastname.toLowerCase()
            ).includes(searchVal.toLowerCase())
          );
          setFilteredData(tempArray);
          break;
        case "byUserId":
          tempArray = resumes.filter((resume) =>
            resume.user._id.trim().includes(searchVal.trim())
          );
          setFilteredData(tempArray);
          break;

        default:
          break;
      }
    }
  };

  const orderFilterOptions = [
    { value: "byNameA_Z", tag: "By Name A-Z" },
    { value: "byNameZ_A", tag: "By Name Z-A" },
    { value: "byDateAsc", tag: "By Date (Ascending)" },
    { value: "byDateDesc", tag: "By Date (Descending)" },
  ];

  const dateFilterOptions = [
    { value: "today", tag: "Created Today" },
    { value: "last7Days", tag: "Created in Last 7 Days" },
    { value: "thisMonth", tag: "Created This Month" },
    {
      value: "thisYear",
      tag: "Created This Year",
    },
    {
      value: "year2020",
      tag: "Created in Year 2020",
    },
  ];

  const searchByOptions = [
    { value: "byUserName", tag: "By User Name" },
    { value: "byNameOnRsume", tag: "By Name on Resume" },
    { value: "byUserId", tag: "By User Id" },
  ];
  const templateOptions = [
    { value: 1, tag: "Basic" },
    { value: 2, tag: "Basic Colors" },
    { value: 3, tag: "The Advance" },
    { value: 4, tag: "The More Advance" },
    { value: 5, tag: "Beauty of Simplicity" },
    { value: 6, tag: "The Funk" },
  ];

  const fillterSection = (
    <div className="col s12">
      <div className="all-user-section-heading">Fillters</div>
      <div className="row">
        <div className="input-field col s12 m3">
          <select value={filterValue} onChange={setFilters}>
            <option value="">SELECT ONE</option>
            <optgroup label="Order">
              {orderFilterOptions.map((option, index) => {
                return (
                  <option key={index} value={option.value}>
                    {option.tag}
                  </option>
                );
              })}
            </optgroup>
            <optgroup label="Date Filter">
              {dateFilterOptions.map((option, index) => {
                return (
                  <option key={index} value={option.value}>
                    {option.tag}
                  </option>
                );
              })}
            </optgroup>
            <optgroup label="Template Filter">
              {templateOptions.map((option, index) => {
                return (
                  <option key={index} value={option.value}>
                    {option.tag}
                  </option>
                );
              })}
            </optgroup>
          </select>
        </div>
        <div className="col s12 m2 all-resume-button-wrapper">
          <button
            className="waves-effect waves-light btn"
            onClick={clearFilter}
          >
            Clear Filter
          </button>
        </div>
        <div className="col m2 s12">
          <div className="input-field col s12">
            <select
              value={searchBy}
              onChange={(e) => {
                changeSearch(e, "option");
              }}
            >
              {searchByOptions.map((option, index) => {
                return (
                  <option key={index} value={option.value}>
                    {option.tag}
                  </option>
                );
              })}
            </select>
            <label>Search By</label>
          </div>
        </div>
        <div className="input-field col s12 m3">
          <i className="material-icons prefix icon-color">search</i>
          <input
            id="icon_prefix"
            type="text"
            className="validate"
            value={searchVal}
            onChange={(e) => {
              changeSearch(e, "data");
              setSearch();
            }}
          />
          <label htmlFor="icon_prefix">Search</label>
        </div>
        <div className="col s12 m2 all-resume-button-wrapper">
          <button className="waves-effect waves-light btn" onClick={setSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );

  const getTableData = () => {
    if (error) {
      return (
        <tr>
          <td colSpan="5">Error Getting Data</td>
        </tr>
      );
    } else if (loading) {
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
    } else if (filteredData.length === 0) {
      return (
        <tr>
          <td colSpan="5">No Data Found</td>
        </tr>
      );
    } else if (success) {
      return filteredData.map((resume, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{resume.firstname + " " + resume.lastname}</td>
            <td>{getResumeType(resume.resumeTemplate)}</td>
            <td>{resume.user.name}</td>
            <td>{resume.user._id}</td>
            <td>{formatDate(new Date(resume.date), "full")}</td>
          </tr>
        );
      });
    }
  };
  const getUserTable = (
    <div className="col s12  all-resumes-table-wrapper">
      <table className="highlight responsive-table centered">
        <thead>
          <tr>
            <th>S.no.</th>
            <th>Name on Resume</th>
            <th>Resume Template</th>
            <th>User Name</th>
            <th>User ID</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody>{getTableData()}</tbody>
      </table>
    </div>
  );

  return (
    <BaseWrapper>
      <div className=" row resume-wrapper">
        <div className="col s12 all-resumes-title">All Resumes</div>
        <div className="col s12">
          <div className="row">
            {fillterSection}
            {getUserTable}
          </div>
        </div>
      </div>
    </BaseWrapper>
  );
};

export default AllResumes;
