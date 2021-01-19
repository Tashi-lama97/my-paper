import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import M from "materialize-css";
import SIGNUP_PIC from "./images/SIGNUP.svg";
import "./css/signup.css";
import { signup } from "../auth/helper";

const Signup = () => {
  useEffect(() => {
    let elements = document.querySelectorAll(".modal");
    let instance = M.Modal.init(elements, {});
    return () => {
      instance[0].destroy();
    };
  }, []);

  const [values, setValues] = useState({
    email: "",
    name: "",
    password: "",
    verifyPassword: "",
    success: "",
    error: "",
  });
  const { email, name, password, verifyPassword, success, error } = values;

  const changeHandler = (field) => (e) => {
    setValues({ ...values, error: false, [field]: e.target.value });
  };
  const register = (e) => {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      verifyPassword.trim() === ""
    ) {
      e.preventDefault();
      M.toast({
        html: "Please Fill All The Fileds!",
        classes: "orange darken-1 text-white",
      });
    } else {
      if (password !== verifyPassword) {
        e.preventDefault();
        M.toast({
          html: "Password Dose not Match !",
          classes: "red accent-4 text-white",
        });
      } else {
        e.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error, success: false });
          } else {
            setValues({
              ...values,
              error: false,
              success: true,
              email: "",
              name: "",
              password: "",
              verifyPassword: "",
            });
          }
        });
      }
    }
  };

  const signupForm = (
    <div id="signup" className="modal signup-form">
      <div className="modal-content">
        <div className="row center">
          <div className="col m6 hide-on-small-only signup-left">
            <img src={SIGNUP_PIC} alt="pic" className="image-signup" />
          </div>
          <div className="col m6 s12 signup-right">
            <div className="row signup-heading">
              <div className="col s12 ">
                <p>Register</p>
              </div>
            </div>
            <form>
              <div className="row">
                <div className="input-field input-field-signup col s12">
                  <input
                    id="name"
                    type="text"
                    className="validate form-input form-input-signup "
                    value={name}
                    onChange={changeHandler("name")}
                  />
                  <label className="input-field-label" htmlFor="name">
                    Name
                  </label>
                </div>

                <div className="input-field input-field-signup col s12">
                  <input
                    id="email"
                    type="email"
                    className="validate form-input form-input-signup "
                    value={email}
                    onChange={changeHandler("email")}
                  />
                  <label className="input-field-label" htmlFor="email">
                    Email
                  </label>
                </div>
                <div className="input-field input-field-signup col s12">
                  <input
                    id="password"
                    type="password"
                    className="validate form-input form-input-signup "
                    value={password}
                    onChange={changeHandler("password")}
                  />
                  <label className="input-field-label" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="input-field input-field-signup col s12">
                  <input
                    id="confirm_password"
                    type="password"
                    className="validate form-input form-input-signup "
                    value={verifyPassword}
                    onChange={changeHandler("verifyPassword")}
                  />
                  <label
                    className="input-field-label"
                    htmlFor="confirm_password"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="row ">
                  <div className="col s12 form-submit">
                    <button
                      className="btn waves-effect waves-light signup-submit"
                      onClick={register}
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  //error message
  useEffect(() => {
    if (error) {
      M.toast({
        html: error,
        classes: "red darken-4",
      });
      setValues({ ...values, error: "" });
    }
    // eslint-disable-next-line
  }, [error]);

  //success message
  useEffect(() => {
    if (success) {
      M.toast({
        html: "Signup Success Please Check Your mail.",
        classes: "green darken-3",
      });
      setValues({ ...values, success: "" });
    }
    // eslint-disable-next-line
  }, [success]);

  return ReactDOM.createPortal(
    signupForm,
    document.getElementById("modal-root")
  );
};

export default Signup;
