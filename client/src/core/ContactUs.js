import React, { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import BaseWrapper from "./BaseWrapper";
import "./css/contactUs.css";
import { sendContactMail } from "./helper/apicalls";
import Base from "./landingPage/Base";
import M from "materialize-css";
import SocialCard from "./SocialCard";

const ContactUs = () => {
  const [indicators, setIndicators] = useState({
    loading: "",
    success: "",
    error: "",
  });
  const { loading, success, error } = indicators;

  const [contact, setContact] = useState({
    senderName: "",
    senderEmail: "",
    emailSubject: "",
    emailMessage: "",
  });

  const { senderEmail, senderName, emailMessage, emailSubject } = contact;

  //ERROR MESSAGE
  useEffect(() => {
    if (error) {
      M.toast({
        html: "Unable to Send Request",
        classes: "red darken-4",
      });
      setIndicators({ ...indicators, error: "" });
    }
    //eslint-disable-next-line
  }, [error]);
  //SUCCESS MESSAGE
  useEffect(() => {
    if (success) {
      M.toast({
        html: "Email sent We will reach you back soon plesae wait",
        classes: "green  darken-4",
      });
      setIndicators({ ...indicators, success: "" });
      M.updateTextFields();
    }
    //eslint-disable-next-line
  }, [success]);

  const changeHandler = (field) => (e) => {
    setContact({ ...contact, [field]: e.target.value });
  };
  const submitContactForm = (e) => {
    e.preventDefault();
    if (
      senderEmail.trim() === "" ||
      senderName.trim() === "" ||
      emailMessage.trim() === "" ||
      emailSubject.trim() === ""
    ) {
      M.toast({
        html: "Please fill all the Fileds.",
        classes: "yellow darken-3",
      });
    } else {
      setIndicators({ ...indicators, loading: true, error: "", success: "" });
      sendContactMail(contact).then((data) => {
        if (data.error) {
          return setIndicators({
            ...indicators,
            loading: false,
            success: false,
            error: data.error,
          });
        } else {
          setIndicators({
            ...indicators,
            loading: false,
            success: true,
            error: false,
          });
          setContact({
            ...contact,
            senderName: "",
            senderEmail: "",
            emailMessage: "",
            emailSubject: "",
          });
        }
      });
    }
  };

  const pageContent = (sectionHeadingClass, subHeading) => {
    return (
      <div className="row contact-us-wrapper">
        <div className="container">
          <div className="col s12 m6">
            <div className="row">
              <div className={sectionHeadingClass + " col s12"}>
                Get in Touch
              </div>
              <div className={subHeading + " col s12"}>
                Please fill out the quick form and we will be in touch with
                lighting speed.
              </div>
              <div className="col s12">
                <div className="row contact-input-wrapper">
                  <div className="input-field contact-input col s12 ">
                    <input
                      id="sender_name"
                      value={senderName}
                      type="text"
                      className="validate"
                      onChange={changeHandler("senderName")}
                    />
                    <label htmlFor="sender_name">Name</label>
                  </div>
                </div>
                <div className="row contact-input-wrapper">
                  <div className="input-field contact-input col s12">
                    <input
                      id="sender_email"
                      type="email"
                      className="validate"
                      value={senderEmail}
                      onChange={changeHandler("senderEmail")}
                    />
                    <label htmlFor="sender_email">Email</label>
                  </div>
                </div>
                <div className="row contact-input-wrapper">
                  <div className="input-field contact-input col s12 ">
                    <input
                      id="sender_subject"
                      type="text"
                      className="validate"
                      value={emailSubject}
                      onChange={changeHandler("emailSubject")}
                    />
                    <label htmlFor="sender_subject">Subject</label>
                  </div>
                </div>
                <div className="row contact-input-wrapper">
                  <div className="input-field contact-input col s12">
                    <textarea
                      id="mail"
                      className="materialize-textarea"
                      data-length="120"
                      value={emailMessage}
                      onChange={changeHandler("emailMessage")}
                    ></textarea>
                    <label htmlFor="mail">Message</label>
                  </div>
                </div>
                <div className="row contact-input-wrapper">
                  <div className="col s12">
                    <button
                      className={
                        loading
                          ? "waves-effect waves-light btn disabled"
                          : "waves-effect waves-light btn"
                      }
                      onClick={submitContactForm}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col s12 m6 ">
            <div className={sectionHeadingClass}>Follow us</div>
            <div className="col s12 social-media-wrapper">
              <div className="row">
                <div className="col s12 socialSection">
                  <SocialCard
                    iconBackground="#4267B2"
                    socialCardIcon="fa-facebook-square"
                    linkData="https://www.facebook.com/tashi.lama.77128/"
                    idTitle="tashi.lama.77128"
                    dis="This where you can find me"
                  />
                </div>
                <div className="col s12 socialSection">
                  <SocialCard
                    iconBackground="linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)"
                    socialCardIcon="fa-instagram"
                    linkData="https://www.instagram.com/my_paper_22/"
                    idTitle="my_paper_22"
                    dis="This where you can find what's new is coming."
                  />
                </div>

                <div className="col s12 socialSection">
                  <SocialCard
                    iconBackground="#333"
                    socialCardIcon="fa-github-square"
                    linkData="https://github.com/Tashi-lama97"
                    idTitle="Tashi-lama97"
                    dis="This where I keep my work."
                  />
                </div>
                <div className="col s12 socialSection">
                  <SocialCard
                    iconBackground="#00acee"
                    socialCardIcon="fa-twitter-square"
                    linkData="https://twitter.com/Tlama40"
                    idTitle="Tlama40"
                    dis="This where I look for news."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const getPage = () => {
    if (isAutheticated()) {
      return (
        <BaseWrapper>
          {pageContent("contact-us-title-dash", "contact-us-title-dash-sub")}
        </BaseWrapper>
      );
    } else {
      return (
        <Base>{pageContent("contact-us-title", "contact-us-title-sub")}</Base>
      );
    }
  };
  return getPage();
};

export default ContactUs;
