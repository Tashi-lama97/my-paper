import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import M from "materialize-css";
import LOGIN_IMG from "./images/login.svg";
import "./css/login.css";
import { authenticate, isAutheticated, login } from "../auth/helper";

const Login = () => {
  useEffect(() => {
    let elements = document.querySelectorAll(".modal");
    let instance = M.Modal.init(elements, {});
    return () => {
      instance[1].destroy();
    };
  }, []);

  const [values, setValues] = useState({
    email: "",
    password: "",
    success: "",
    error: "",
    loading: "",
  });
  const { email, password, success, error, loading } = values;

  const { user } = isAutheticated();

  const handleChange = (field) => (e) => {
    return setValues({ ...values, [field]: e.target.value });
  };

  const tryLogin = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      M.toast({
        html: "Please fill all the feilds",
        classes: "yellow darken-2",
      });
    } else {
      setValues({ ...values, error: "", loading: true, success: "" });
      login({ email, password }).then((data) => {
        if (data.error) {
          setValues({
            ...values,
            success: "",
            error: data.error,
            loading: false,
          });
        } else {
          authenticate(data, () => {
            setValues({ ...values, success: true });
          });
        }
      });
    }
  };

  //ERROR MESSAGE
  useEffect(() => {
    if (error) {
      M.toast({ html: error, classes: "red darken-3" });
      setValues({ ...values, error: "" });
    }
    //eslint-disable-next-line
  }, [error]);

  //SUCCESS OPRATION
  const performRedirect = () => {
    if (success) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else if (user) {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (
      window.location.href.slice(0, window.location.href.lastIndexOf("/")) !==
      "http://localhost:3000/verifyemail"
    ) {
      if (isAutheticated()) {
        if (isAutheticated().user.role === 1) {
          return <Redirect to="/admin/dashboard" />;
        } else {
          return <Redirect to="/user/dashboard" />;
        }
      }
    }
  };

  const getbuttonClasses = loading
    ? "btn waves-effect waves-light login-submit disabled"
    : "btn waves-effect waves-light login-submit";

  const loginForm = (
    <div id="login" className="modal login-form">
      {performRedirect()}
      <div className="modal-content">
        <div className="row center">
          <div className="col m6 hide-on-small-only login-left">
            <img src={LOGIN_IMG} alt="pic" className="image-login" />
          </div>
          <div className="col m6 s12 login-right">
            <div className="row">
              <div className="col s12 ">
                <p className="login-heading">Login</p>
              </div>
            </div>
            <form>
              <div className="row">
                <div className="input-field col s12 input-field-login">
                  <input
                    id="emailLogin"
                    type="email"
                    className="validate form-input form-input-login"
                    value={email}
                    onChange={handleChange("email")}
                  />
                  <label className="input-field-label" htmlFor="emailLogin">
                    Email
                  </label>
                </div>
                <div className="input-field input-field-login col s12">
                  <input
                    id="passwordLogin"
                    type="password"
                    className="validate form-input form-input-login"
                    value={password}
                    onChange={handleChange("password")}
                  />
                  <label className="input-field-label" htmlFor="passwordLogin">
                    Password
                  </label>
                </div>

                <div className="row ">
                  <div className="col s12 form-submit">
                    <button className={getbuttonClasses} onClick={tryLogin}>
                      Login
                    </button>
                  </div>
                  <div className="col s12 forgot-password">
                    <Link to="/forgotpassword" className="white-text ">
                      Forgot Password ?
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(
    loginForm,
    document.getElementById("modal-root")
  );
};

export default Login;
