import React, { Fragment, useEffect } from "react";
import M from "materialize-css";
import { Link, withRouter } from "react-router-dom";
import "./css/topBar.css";
import { isAutheticated, logout } from "../auth/helper";

const TopBar = ({ history }) => {
  useEffect(() => {
    let element = document.querySelectorAll(".dropdown-trigger");
    let instance = M.Dropdown.init(element, {
      hover: false,
      coverTrigger: false,
    });
    return () => {
      instance[0].destroy();
    };
  }, []);

  const { user } = isAutheticated();

  const tryLogout = () => {
    if (window.confirm("Are you Sure You want to logout.")) {
      logout(() => {
        history.push("/");
      });
    }
  };

  return (
    <Fragment>
      <ul id="user-data" className="dropdown-content top-bar-dropdown">
        <li className="top-bar-li">
          <Link className="top-bar-link" to="/user/profile">
            <i className="fas fa-user"></i> My Profile
          </Link>
        </li>
        <li className="divider"></li>
        <li className="top-bar-li">
          <div className="btn-logout" onClick={tryLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span className="btn-logout-span"> &nbsp; LogOut</span>
          </div>
        </li>
      </ul>
      <nav className="top-nav-wrapper">
        <div className="nav-wrapper">
          <button
            data-target="slide-out"
            className="sidenav-trigger btn-flat white-text hide-on-large-only"
          >
            <i className="material-icons blue-text">menu</i>
          </button>
          <ul className="right ">
            <li>
              <a
                className="dropdown-trigger top-bar-dlink"
                href="#!"
                data-target="user-data"
              >
                <span className="greeting-message">Hello! </span> {user.name}
                <i className="material-icons right">arrow_drop_down</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default withRouter(TopBar);
