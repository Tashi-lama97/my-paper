import React, { useEffect } from "react";
import M from "materialize-css";
import { Link, withRouter } from "react-router-dom";
import MRCICON from "../user/images/mrcNew.png";
import "./css/navigationMain.css";
import { isAutheticated } from "../auth/helper";
import { Fragment } from "react";

const NavigationMain = ({ history }) => {
  useEffect(() => {
    let element = document.querySelectorAll(".sidenav");
    let instance = M.Sidenav.init(element, {});
    return () => {
      instance[0].destroy();
    };
  }, []);

  const { user } = isAutheticated();

  const getActiveBackground = (history, path) => {
    if (history.location.pathname === path) {
      return "active";
    } else {
      return "";
    }
  };
  return (
    <div className="imageBackground">
      <ul
        id="slide-out"
        className="sidenav sidenav-fixed navigation-main-sidenav "
      >
        <li className="overLay"></li>
        <li className="logo navigation-main-logo">
          <Link
            className="navigation-main-logo-links"
            to={user.role === 1 ? "/admin/dashboard" : "/user/dashboard"}
          >
            <img
              src={MRCICON}
              alt="mrc icon"
              className="navigation-main-logo-img"
            />
          </Link>
        </li>

        <li className="navigation-main-li-items">
          <Link
            to={user.role === 1 ? "/admin/dashboard" : "/user/dashboard"}
            className="navigation-main-links"
            id={getActiveBackground(
              history,
              user.role === 1 ? "/admin/dashboard" : "/user/dashboard"
            )}
          >
            <i className="fas fa-tachometer-alt navigation-main-li-link-icon "></i>
            Dashboard
          </Link>
        </li>
        {isAutheticated().user.role === 1 && (
          <Fragment>
            <li className="navigation-main-li-items">
              <Link
                to="/admin/users"
                className="navigation-main-links"
                id={getActiveBackground(history, "/admin/users")}
              >
                <i className="fas fa-users navigation-main-li-link-icon"></i>
                All Users
              </Link>
            </li>
            <li className="navigation-main-li-items">
              <Link
                to="/admin/resumes"
                className="navigation-main-links"
                id={getActiveBackground(history, "/admin/resumes")}
              >
                <i className="fas fa-folder-open navigation-main-li-link-icon"></i>
                All Resumes
              </Link>
            </li>
          </Fragment>
        )}
        <li className="navigation-main-li-items">
          <Link
            to="/user/myresumes"
            className="navigation-main-links"
            id={getActiveBackground(history, "/user/myresumes")}
          >
            <i className="far fa-file-alt navigation-main-li-link-icon"></i> My
            Resumes
          </Link>
        </li>
        <li className="navigation-main-li-items">
          <Link
            to="/user/templates"
            className="navigation-main-links"
            id={getActiveBackground(history, "/user/templates")}
          >
            <i className="far fa-file-invoice navigation-main-li-link-icon"></i>
            Templates
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(NavigationMain);
