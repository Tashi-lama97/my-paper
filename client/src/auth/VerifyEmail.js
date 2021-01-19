import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Base from "../core/landingPage/Base";
import { verifyEmailToken } from "./helper/verifyEmailAPIcalls";
import VERIFYICON from "./images/verifiedIcon.gif";
import ERRORICON from "./images/errorIcon.gif";
import "./css/verifyEmail.css";
import "./css/loadingAnimation.css";

const VerifyEmail = ({ history }) => {
  const [values, setValues] = useState({
    success: "",
    error: "",
    loading: "",
  });
  const { success, error, loading } = values;

  const { verificationToken } = useParams();

  useEffect(() => {
    setValues({ ...values, error: "", success: "", loading: true });
    verifyEmailToken(verificationToken).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          success: data.message,
          error: "",
          loading: "",
        });
      }
    });
    // eslint-disable-next-line
  }, []);

  const successMessage = () => {
    if (success) {
      return (
        <div className="verified-wrapper">
          <img
            src={VERIFYICON}
            alt="verification Icon"
            className="verification-icon"
          />
          <h2 className="verification-message">{success}</h2>
          <p className="verification-info">
            Please Login with Your credential.
          </p>
        </div>
      );
    }
  };
  const errorMessage = () => {
    if (error) {
      return (
        <div>
          <div className="error-wrapper">
            <img src={ERRORICON} alt="Error Icon" className="error-icon" />
            <h3 className="error-message">Email Verification Failed</h3>
            <p className="error-info">Please Check Your Email again.</p>
          </div>
        </div>
      );
    }
  };

  const lodingAnimation = () => {
    if (loading) {
      return (
        <div className="animation-wrapper">
          <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
          </div>
          <div className="center">
            <h3 className="blinking-text">Verifying Email</h3>
          </div>
        </div>
      );
    }
  };

  return (
    <Base>
      <div className="main ">
        {lodingAnimation()}
        {successMessage()}
        {errorMessage()}
      </div>
    </Base>
  );
};

export default VerifyEmail;
