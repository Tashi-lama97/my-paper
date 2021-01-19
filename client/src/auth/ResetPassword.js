import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import Base from "../core/landingPage/Base";
import ERRORICON from "./images/errorIcon.gif";
import M from "materialize-css";
import "./css/resetPassword.css";
import { changePassword, validateToken } from "./helper/forgotPasswordAPIcalls";

const ResetPassword = () => {
  const { resetToken } = useParams();

  //PASSWORD STATE
  const [passwords, setPasswords] = useState({
    password: "",
    confirm_password: "",
    error: "",
    success: "",
    loading: "",
  });

  const { password, confirm_password, success, error, loading } = passwords;

  //TOKRN VALIDATION STATE
  const [validation, setValidation] = useState({
    vloading: "",
    vsuccess: "",
    verror: "",
  });

  const { vloading, verror, vsuccess } = validation;

  //VALIDATING TOKRN
  useEffect(() => {
    setValidation({ ...validation, verror: "", vsuccess: "", vloading: true });
    validateToken(resetToken).then((data) => {
      if (data.error) {
        return setValidation({
          ...validation,
          vsuccess: false,
          verror: data.error,
          vloading: false,
        });
      } else {
        return setValidation({
          ...validation,
          vsuccess: data.message,
          verror: "",
          vloading: "",
        });
      }
    });
    //eslint-disable-next-line
  }, []);

  const handelChange = (field) => (e) => {
    setPasswords({ ...passwords, [field]: e.target.value });
  };

  const resetPassword = (e) => {
    e.preventDefault();
    if (confirm_password.trim() === "" || password.trim() === "") {
      M.toast({ html: "Please Fill both Fileds", classes: "yellow darken-2" });
    } else if (confirm_password !== password) {
      M.toast({
        html: "Password does not match please enter correct password",
        classes: "yellow darken-2",
      });
    } else {
      setPasswords({ ...passwords, success: "", error: "", loading: true });
      changePassword(confirm_password, resetToken).then((data) => {
        if (data.error) {
          return setPasswords({
            ...passwords,
            success: false,
            error: data.error,
            loading: false,
          });
        } else {
          setPasswords({
            ...setPasswords,
            password: "",
            confirm_password: "",
            success: data.message,
            error: "",
            loading: false,
          });
        }
      });
    }
  };

  //SUCCESS MESSAGE
  useEffect(() => {
    if (success) {
      M.toast({ html: success, classes: "green darken-3" });
      setPasswords({ ...passwords, sucess: "" });
    }
    //eslint-disable-next-line
  }, [success]);

  //ERROR MESSAGE
  useEffect(() => {
    if (error) {
      M.toast({ html: error, classes: " red darken-3" });
      setPasswords({ ...passwords, error: "" });
    }
    //eslint-disable-next-line
  }, [error]);
  const submitButton = () => {
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
          onClick={resetPassword}
          className="btn waves-effect waves-light button-fpass"
        >
          Change Password
        </button>
      );
    }
  };
  const responseComponent = () => {
    if (vsuccess) {
      return (
        <div className="reset-password-wrapper-content-success">
          <div className="reset-password-heading">Reset Password</div>
          <div className="row reset-password-form">
            <div className="input-field col s12 input-field-resetPass ">
              <input
                id="reset_new_password"
                type="password"
                className="validate reset-password-input"
                value={password}
                onChange={handelChange("password")}
              />
              <label
                htmlFor="reset_new_password"
                className="reset-password-label"
              >
                New Password
              </label>
            </div>
            <div className="input-field col s12 input-field-resetPass ">
              <input
                id="reset_confirm_password"
                type="password"
                className="validate reset-password-input"
                value={confirm_password}
                onChange={handelChange("confirm_password")}
              />
              <label
                htmlFor="reset_confirm_password"
                className="reset-password-label"
              >
                Confirm Password
              </label>
            </div>
            <div className="col s12 reset-password-submit-bloack center">
              {submitButton()}
            </div>
          </div>
        </div>
      );
    } else if (verror) {
      return (
        <div className="reset-password-wrapper-content-error">
          <div className="reset-password-error-img-block">
            <img
              src={ERRORICON}
              alt="Error icon"
              className="reset-password-error-img"
            />
          </div>
          <div className="reset-password-error-text-block">
            <h2 className="reset-password-error-text">{verror}</h2>
          </div>
        </div>
      );
    } else if (vloading) {
      return (
        <Fragment>
          <div className="waiting-rpass">
            <div className="dots"></div>
            <div className="dots"></div>
            <div className="dots"></div>
            <div className="dots"></div>
            <div className="dots"></div>
            <div className="dots"></div>
          </div>
          <div className="validation-text">Validating Token</div>
        </Fragment>
      );
    }
  };
  return (
    <Base>
      <div className="reset-password-wrapper-main">{responseComponent()}</div>
    </Base>
  );
};

export default ResetPassword;
