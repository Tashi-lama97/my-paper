import React, { useState, useEffect } from "react";
import Base from "../core/landingPage/Base";
import M from "materialize-css";
import { requestResetPasswordLink } from "./helper/forgotPasswordAPIcalls";
import "./css/forgotPassword.css";
import "./css/waitingAnimation.css";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
    success: "",
    error: "",
    loading: "",
  });
  const { email, success, error, loading } = values;

  //error message
  useEffect(() => {
    if (error) {
      M.toast({ html: error, classes: " red darken-3" });
    }
    setValues({ ...values, error: "" });
    //eslint-disable-next-line
  }, [error]);

  //Success message
  useEffect(() => {
    if (success) {
      M.toast({ html: success, classes: "green darken-2" });
    }
    setValues({ ...values, success: "" });
    //eslint-disable-next-line
  }, [success]);

  const handleChange = (field) => (e) => {
    return setValues({ ...values, [field]: e.target.value });
  };
  const getResetLink = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      return M.toast({
        html: "Please Enter Your Email !",
        classes: "amber darken-1",
      });
    }
    setValues({ ...values, error: "", success: "", loading: true });
    requestResetPasswordLink(email).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          success: "",
          error: data.error,
          loading: false,
        });
      } else {
        setValues({
          ...values,
          email: "",
          error: "",
          success: data.message,
          loading: false,
        });
      }
    });
  };
  const whenLoading = () => {
    if (loading) {
      return (
        <div className="btn loading-fpass">
          <div className="balls"></div>
          <div className="balls"></div>
          <div className="balls"></div>
          <div className="balls"></div>
          <div className="balls"></div>
        </div>
      );
    } else {
      return (
        <button
          onClick={getResetLink}
          className="btn waves-effect waves-light button-fpass"
        >
          Reset Password
        </button>
      );
    }
  };
  return (
    <Base>
      <div className="content-wrapper">
        <div className="wrapper z-depth-4 rounded">
          <div className="row fblock">
            <div className="col s12 center text-section-fpass">
              <h3 className="heading-fpass">Forgot Password</h3>
              <p className="discription-fpass">
                Please enter your email address to get link for reseting your
                password.
              </p>
            </div>
            <div className="input-field col s12 input-field-fpass">
              <input
                id="forgotPasswordEmail"
                type="email"
                className="validate form-input form-input-fpass"
                value={email}
                onChange={handleChange("email")}
              />
              <label className="lable-fpass" htmlFor="forgotPasswordEmail">
                Email
              </label>
            </div>
            <div className="col s12 submit-fpass center">{whenLoading()}</div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default ForgotPassword;
