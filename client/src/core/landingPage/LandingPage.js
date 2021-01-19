import React, { useEffect } from "react";
//libraries
import M from "materialize-css";
//components
import Parallax from "./Parallax";

import Base from "./Base";
//images
import PIC from "./images/PIC5.svg";
import MULTIPIC from "./images/multiple.svg";
import FILL_DETAILES from "./images/fill.svg";
import EASY_DOWNLOAD from "./images/easy_download.svg";
import CHOOSE from "./images/choose.svg";
import FILL_DETAILES2 from "./images/fill_details.svg";
import ADD_USER from "./images/add_user.svg";
import EXPORT_PDF from "./images/export_pdf.svg";
//css
import "./css/landingPage.css";
import "./css/animation.css";

const LandingPage = () => {
  useEffect(() => {
    let el = document.querySelectorAll(".tabs");
    M.Tabs.init(el, { swipeable: true });
  }, []);
  const signupSection = (
    <div className="content-1">
      <div className="row  center">
        <div className="container">
          <div className="col s12 m6 col-left">
            <img src={PIC} alt="pic" className="image" />
          </div>
          <div className="col s12 m6 col-right">
            <p className="line-1">
              Make the process easy of creating your Resume
            </p>
            <p className="line-2">
              Just fill the details and get your resume ready
            </p>
            <button
              data-target="signup"
              className="btn modal-trigger waves-effect waves-light btn-signup"
            >
              Get your first resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  const services = (
    <div className="row white services center">
      <div className="container">
        <div className="col s12 m4 services-col ">
          <img
            src={MULTIPIC}
            alt="Multiple Templates to choose from"
            className="services-img"
          />
          <p className="services-tagLine">Multiple Templates to choose from.</p>
        </div>
        <div className="col s12 m4 services-col">
          <img
            src={FILL_DETAILES}
            alt="Multiple Templates to choose from"
            className="services-img"
          />
          <p className="services-tagLine">
            Just fill your details and get your resume ready in minutes.
          </p>
        </div>
        <div className="col s12 m4 services-col">
          <img
            src={EASY_DOWNLOAD}
            alt="Multiple Templates to choose from"
            className="services-img"
          />
          <p className="services-tagLine">One click download.</p>
        </div>
      </div>
    </div>
  );
  const howToCreateYourResume = (
    <div className="build-section">
      <div className="context">
        <div className="row">
          <div className="col s12 m12 build-heading">
            How to Create Your Resume
          </div>
        </div>
        <div className="row">
          <div className="container center">
            <div id="step1" className="col s12 steps ">
              <img src={ADD_USER} alt="Multiple Templates to choose from" />

              <p>Register your first account.</p>
            </div>
            <div id="step2" className="col s12 steps">
              <img src={CHOOSE} alt="Multiple Templates to choose from" />
              <p>Choose your Template.</p>
            </div>
            <div id="step3" className="col s12 steps">
              <img
                src={FILL_DETAILES2}
                alt="Multiple Templates to choose from"
              />
              <p>Add your details.</p>
            </div>
            <div id="step4" className="col s12 steps ">
              <img src={EXPORT_PDF} alt="Multiple Templates to choose from" />
              <p>Export your PDF File.</p>
            </div>

            <div className="col s12 center">
              <ul className="tabs ">
                <li className="tab col s3">
                  <a href="#step1">1</a>
                </li>
                <li className="tab col s3">
                  <a href="#step2">2</a>
                </li>
                <li className="tab col s3 ">
                  <a href="#step3">3</a>
                </li>
                <li className="tab col s3">
                  <a href="#step4">4</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );

  return (
    <Base>
      {signupSection}
      {services}
      <Parallax />
      {howToCreateYourResume}
    </Base>
  );
};

export default LandingPage;
