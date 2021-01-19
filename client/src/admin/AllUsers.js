import React, { useEffect, useState } from "react";
import { isAutheticated } from "../auth/helper";
import BaseWrapper from "../core/BaseWrapper";
import "./css/allUsers.css";
import { getAllUsers } from "./helper/apicalls";
import M from "materialize-css";

const AllUsers = () => {
  const { token, user } = isAutheticated();
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [indicators, setIndicators] = useState({
    loading: "",
    success: "",
    error: "",
  });
  const { loading, success, error } = indicators;

  const [filterValue, setFilterValue] = useState("");
  const [searchVal, setSearchVal] = useState("");

  const setUserData = (token, userId) => {
    setIndicators({ ...indicators, success: "", error: "", loading: true });
    getAllUsers(token, userId).then((data) => {
      if (data.error) {
        setIndicators({
          ...indicators,
          error: data.error,
          success: "",
          loading: "",
        });
      } else {
        setIndicators({
          ...indicators,
          error: "",
          success: true,
          loading: "",
        });
        setUsers(data);
        setFilteredData(data);
      }
    });
  };

  //CSS SELECT
  useEffect(() => {
    let elems = document.querySelectorAll("select");
    let instances = M.FormSelect.init(elems, {});

    return () => {
      instances[0].destroy();
    };
  }, []);

  useEffect(
    () => {
      setUserData(token, user.id);
    },
    //eslint-disable-next-line
    []
  );

  useEffect(() => {
    if (searchVal.trim() === "") {
      setFilteredData(users);
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

  const changeSearch = (e) => {
    setSearchVal(e.target.value);
  };

  const clearFilter = () => {
    setFilteredData(users);
    setFilterValue("");
  };
  const setFilters = (e) => {
    let key = e.target.value;
    let tempArray = [];
    switch (key) {
      case "byNameA_Z":
        tempArray = [...users].sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        setFilteredData(tempArray);
        break;
      case "byNameZ_A":
        tempArray = [...users].sort((a, b) =>
          a.name > b.name ? -1 : b.name > a.name ? 1 : 0
        );
        setFilteredData(tempArray);
        break;
      case "byDateAsc":
        tempArray = [...users].sort((a, b) =>
          new Date(a.createdAt) > new Date(b.createdAt)
            ? 1
            : new Date(b.createdAt) > new Date(a.createdAt)
            ? -1
            : 0
        );
        setFilteredData(tempArray);
        break;
      case "byDateDesc":
        tempArray = [...users].sort((a, b) =>
          new Date(a.createdAt) > new Date(b.createdAt)
            ? -1
            : new Date(b.createdAt) > new Date(a.createdAt)
            ? 1
            : 0
        );
        setFilteredData(tempArray);
        break;

      case "today":
        tempArray = users.filter(
          (user) =>
            formatDate(new Date(user.createdAt), "full") ===
            formatDate(new Date(), "full")
        );
        setFilteredData(tempArray);
        break;
      case "last7Days":
        let n = new Date();
        n.setDate(n.getDate() - 7);
        tempArray = users.filter(
          (user) =>
            formatDate(new Date(user.createdAt), "date") >=
              formatDate(n, "date") &&
            formatDate(new Date(user.createdAt), "month") ===
              formatDate(new Date(), "month") &&
            formatDate(new Date(user.createdAt), "year") ===
              formatDate(new Date(), "year") &&
            formatDate(new Date(user.createdAt), "date") <
              formatDate(new Date(), "date")
        );
        setFilteredData(tempArray);
        break;
      case "thisMonth":
        tempArray = users.filter(
          (user) =>
            formatDate(new Date(user.createdAt), "month") ===
              formatDate(new Date(), "month") &&
            formatDate(new Date(user.createdAt), "year") ===
              formatDate(new Date(), "year")
        );
        setFilteredData(tempArray);
        break;
      case "year2020":
        let d = new Date();
        d.setFullYear(2020);
        tempArray = users.filter(
          (user) =>
            formatDate(new Date(user.createdAt), "year") ===
            formatDate(d, "year")
        );
        setFilteredData(tempArray);
        break;
      case "thisYear":
        tempArray = users.filter(
          (user) =>
            formatDate(new Date(user.createdAt), "year") ===
            formatDate(new Date(), "year")
        );
        setFilteredData(tempArray);
        break;
      case "verified":
        tempArray = users.filter((user) => user.verified === true);
        setFilteredData(tempArray);
        break;
      case "unverified":
        tempArray = users.filter((user) => user.verified === false);
        setFilteredData(tempArray);
        break;

      default:
        break;
    }
  };
  const setSearch = () => {
    let tempArray = [];
    if (searchVal.trim() !== "") {
      tempArray = users.filter((user) =>
        user.name.toLowerCase().includes(searchVal.toLowerCase())
      );
      setFilteredData(tempArray);
    }
  };

  const orderFilterOptions = [
    { value: "byNameA_Z", tag: "By Name A-Z" },
    { value: "byNameZ_A", tag: "By Name Z-A" },
    { value: "byDateAsc", tag: "By Date (Ascending)" },
    { value: "byDateDesc", tag: "By Date (Descending)" },
  ];

  const dateFilterOptions = [
    { value: "today", tag: "Registered Today" },
    { value: "last7Days", tag: "Registered in Last 7 Days" },
    { value: "thisMonth", tag: "Registered This Month" },
    {
      value: "thisYear",
      tag: "Registered This Year",
    },
    {
      value: "year2020",
      tag: "Registered in Year 2020",
    },
  ];

  const verificationStatusOptions = [
    {
      value: "verified",
      tag: "Verified",
    },
    {
      value: "unverified",
      tag: "Non Verified",
    },
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
            <optgroup label="Verification Status">
              {verificationStatusOptions.map((option, index) => {
                return (
                  <option key={index} value={option.value}>
                    {option.tag}
                  </option>
                );
              })}
            </optgroup>
          </select>
        </div>
        <div className="col s12 m2 all-users-button-wrapper">
          <button
            className="waves-effect waves-light btn"
            onClick={clearFilter}
          >
            Clear Filter
          </button>
        </div>
        <div className="col m2 hide-on-small-only"></div>
        <div className="input-field col s12 m3">
          <i className="material-icons prefix icon-color">search</i>
          <input
            id="icon_prefix"
            type="text"
            className="validate"
            value={searchVal}
            onChange={(e) => {
              changeSearch(e);
              setSearch();
            }}
          />
          <label htmlFor="icon_prefix">Search by name</label>
        </div>
        <div className="col s12 m2 all-users-button-wrapper">
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
      return filteredData.map((user, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user._id}</td>
            <td>{formatDate(new Date(user.createdAt), "full")}</td>
            <td>
              {user.verified ? (
                <i className="far fa-dot-circle green-text"></i>
              ) : (
                <i className="far fa-dot-circle red-text"></i>
              )}
            </td>
          </tr>
        );
      });
    }
  };

  const getUserTable = (
    <div className="col s12  all-users-table-wrapper">
      <table className="highlight responsive-table centered">
        <thead>
          <tr>
            <th>S.no.</th>
            <th>Name</th>
            <th>ID</th>
            <th>Registration Date</th>
            <th>Verification Status</th>
          </tr>
        </thead>
        <tbody>{getTableData()}</tbody>
      </table>
    </div>
  );
  return (
    <BaseWrapper>
      <div className="row all-users-wrapper">
        <div className="col s12 all-users-title">All Users</div>
        <div className="col s12">
          <div className="row all-users-content-wrapper">
            {fillterSection}
            {getUserTable}
          </div>
        </div>
      </div>
    </BaseWrapper>
  );
};

export default AllUsers;
