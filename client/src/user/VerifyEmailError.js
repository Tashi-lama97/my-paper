import React from "react";
import ICON from "../mrc.png";
import { Link } from "react-router-dom";
import "./css/verifyEmail.css";
import Footer from "../core/Footer";
import { isAutheticated } from "../auth/helper";

const VerifyEmail = () => {
  const { user } = isAutheticated();
  return (
    <div className="verify-error-main">
      <nav className="verify-error-nav">
        <div class="nav-wrapper">
          <Link to="/" class="brand-logo center">
            <img src={ICON} alt="icon" className="brand-logo-icon" />
          </Link>
        </div>
      </nav>
      <div className="row verify-error-wrapper ">
        <div className="container">
          <div className="col s12 center verify-error-block">
            <h3 className="verify-error-message">
              Hey {user.name}, Please verify your email to start using all the
              features.
            </h3>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyEmail;
