import React, { Fragment, useEffect, useState } from "react";
import { isAutheticated } from "../auth/helper";
import BaseWrapper from "../core/BaseWrapper";
import "./css/profile.css";
import M from "materialize-css";
import { updateUserInfo } from "./helper/userAPICalls";

const Profile = () => {
  const { token, user } = isAutheticated();
  const [edit, setEdit] = useState(false);
  const [indicators, setIndicators] = useState({
    loading: "",
    success: "",
    error: "",
  });
  const { loading, success, error } = indicators;

  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
  });

  const { name, email } = userData;

  // UPDATE TEXT FIELD
  useEffect(() => {
    M.updateTextFields();
  }, [edit]);

  useEffect(() => {
    if (error) {
      M.toast({ html: "Unable to update", classes: "red darken-4" });
      setIndicators({ ...indicators, error: "" });
    }
    //eslint-disable-next-line
  }, [error]);

  useEffect(() => {
    if (success) {
      M.toast({
        html: "Profile Successfully Updated",
        classes: "green darken-4",
      });
      setIndicators({ ...indicators, success: "" });
    }
    //eslint-disable-next-line
  }, [success]);

  const changeHandler = (field) => (e) => {
    setUserData({ ...userData, [field]: e.target.value });
  };

  const updateUser = (e) => {
    e.preventDefault();
    setIndicators({ ...indicators, loading: true, success: "", error: "" });
    updateUserInfo(token, user.id, userData).then((data) => {
      if (data.error) {
        setIndicators({
          ...indicators,
          loading: "",
          success: "",
          error: data.error,
        });
      } else {
        setIndicators({ ...indicators, loading: "", success: true, error: "" });
        setUserData({ ...userData, name: data.name });
        if (typeof window !== "undefined") {
          let updatedData = JSON.parse(localStorage.getItem("jwt"));
          updatedData.user.name = data.name;
          localStorage.setItem("jwt", JSON.stringify(updatedData));
        }
      }
    });
  };

  const getProfileContent = () => {
    if (edit) {
      return (
        <Fragment>
          <div className="input-field col s12 m6">
            <input
              id="userName"
              type="text"
              value={name}
              className="validate"
              onChange={changeHandler("name")}
            />
            <label htmlFor="userName">Name</label>
          </div>
          <div className="input-field col s12 m6">
            <input
              id="userEmail"
              disabled
              type="text"
              value={email}
              className="validate"
            />
            <label htmlFor="userEmail">Email</label>
          </div>
          <div className="col s12">
            <button
              className={
                loading
                  ? "waves-effect waves-light btn disabled"
                  : "waves-effect waves-light btn"
              }
              onClick={updateUser}
            >
              Update
            </button>
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <div className="col s12 m6">
            <h3 className="profileDetailsTitles">Name</h3>
            <p className="profileDetailsData">{user.name}</p>
          </div>
          <div className="col s12 m6">
            <h3 className="profileDetailsTitles">Email</h3>
            <p className="profileDetailsData">{user.email}</p>
          </div>
        </Fragment>
      );
    }
  };
  return (
    <BaseWrapper>
      <div className="row profileContentWrapper">
        <div className="col profileTitle s12">Profile</div>
        <div className="col s12 profileMainContent">
          <div className="row profileCardWrapper">
            <div className="col s12">
              <div className="card">
                <div className="card-content profileDetailsCardContent">
                  <div className="profileDetailsHead">
                    <div className="headLeftSection">Details</div>
                    <div className="headRightSection">
                      <button
                        className="waves-effect waves-light btn"
                        onClick={() => {
                          setEdit(!edit);
                        }}
                      >
                        {edit ? (
                          <span className="editText"> Cancel</span>
                        ) : (
                          <Fragment>
                            <i className="fas fa-edit editIcon"></i>
                            <span className="editText">Edit</span>{" "}
                          </Fragment>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="profileCardMainContent">
                    <div className="row">{getProfileContent()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseWrapper>
  );
};

export default Profile;
