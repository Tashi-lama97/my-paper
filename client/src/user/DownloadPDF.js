import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BaseWrapper from "../core/BaseWrapper";
import { isAutheticated } from "../auth/helper";
import PDFDownloadButton from "../pdfGenration/PDFDownloadButton";
import { getResumeUsingId } from "./helper/userAPICalls";
import OOPS from "./images/oops.gif";
import LOADING from "./images/loading.gif";
import SUCCESS from "./images/success.gif";
import "./css/pdfDownload.css";

const DownloadPDF = () => {
  const { resumeId } = useParams();
  const { token, user } = isAutheticated();
  const [resume, setResume] = useState([]);
  const [indicators, setIndicators] = useState({
    loading: "",
    error: "",
    success: "",
  });
  const { loading, error, success } = indicators;

  useEffect(() => {
    setIndicators({ ...indicators, loading: true });

    getResumeUsingId(token, user.id, resumeId).then((data) => {
      if (data.error) {
        setIndicators({ ...indicators, error: data.error, loading: false });
      } else {
        setIndicators({ ...indicators, loading: false, success: true });
        setResume(data);
      }
    });

    //eslint-disable-next-line
  }, []);
  const getView = () => {
    if (error) {
      return (
        <div className="flex-section download-page-error">
          <img src={OOPS} alt="errorlogo" className="download-page-oops-logo" />
          <h4 className="download-page-error-msg">{error}</h4>
        </div>
      );
    } else if (success) {
      return (
        <div className="download-page-success flex-section">
          <div className="download-page-success-text-animation flex-section">
            <img
              src={SUCCESS}
              alt="successanimation"
              className="download-page-success-animation"
            />
            <div className="download-page-success-text">congratulations</div>
          </div>
          <PDFDownloadButton cssList={styles} resumeInfo={resume} />
        </div>
      );
    } else if (loading) {
      return (
        <div className=" flex-section download-page-loading">
          <img
            src={LOADING}
            alt="loading animation"
            className="download-page-loading-animation"
          />
          <h4 className="download-page-loading-text">
            Loading<span className="loading-dots">.</span>
            <span className="loading-dots">.</span>
            <span className="loading-dots">.</span>
          </h4>
        </div>
      );
    }
  };

  const styles = "download-page-btn";
  return (
    <BaseWrapper>
      <div className="download-page-main-wrapper  flex-section">
        {getView()}
      </div>
    </BaseWrapper>
  );
};

export default DownloadPDF;
