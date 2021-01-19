import React from "react";
import Footer from "./Footer";
import NavigationMain from "./NavigationMain";
import TopBar from "./TopBar";
import "./css/baseWrapper.css";

const BaseWrapper = ({ children }) => {
  return (
    <div className="base-wrapper-main">
      <NavigationMain />
      <div className="base-wrapper-content-right">
        <div className="navbar-fixed base-wrapper-navbar-fixed">
          <TopBar />
        </div>

        <div className="base-wrapper-main-content">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default BaseWrapper;
