import React, { useEffect, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../../mrc.png";
import M from "materialize-css";
import "./css/navigation.css";

const Navigation = ({ history }) => {
  //Sidenav initialization
  useEffect(() => {
    let elements = document.querySelectorAll(".sidenav");
    let instance = M.Sidenav.init(elements, { edge: "right" });
    return () => {
      instance[0].destroy();
    };
  }, []);

  //Navbar Shadow
  useEffect(() => {
    let header = document.querySelector(".nav-shadow");
    if (history.location.pathname === "/") {
      window.addEventListener("scroll", () => {
        let scroll = window.scrollY;
        if (scroll === 0) {
          header.classList.remove("active-shadow");
        } else {
          header.classList.add("active-shadow");
        }
      });
    } else {
      header.classList.add("active-shadow");
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className="navbar-fixed">
        <nav className="nav-shadow">
          <div className="nav-wrapper landing-page-nav-wrapper">
            <div className="container">
              <div className="row">
                <div className="col s4">
                  <Link to={"/"} className="brand-logo left">
                    <img src={logo} alt="" className="logo" />
                  </Link>
                </div>

                <div className="col s8">
                  <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                      <button
                        data-target="login"
                        className="btn modal-trigger btn-login "
                      >
                        Login
                      </button>
                    </li>
                  </ul>
                  <a
                    href="/#"
                    data-target="slide-out"
                    className="sidenav-trigger right"
                  >
                    <i className="material-icons">menu</i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <ul id="slide-out" className="sidenav center">
        <li>
          <button
            data-target="login"
            className="btn modal-trigger sidenav-btn-login"
          >
            Login
          </button>
        </li>
      </ul>
    </Fragment>
  );
};

export default withRouter(Navigation);
