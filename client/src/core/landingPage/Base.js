import React from "react";
import Navigation from "./Navigation";
import Footer from "../Footer";
import Signup from "../../user/Signup";
import Login from "../../user/Login";
import "./css/base.css";

const Base = ({ children }) => {
  return (
    <div className="main-wapper">
      <Navigation />
      {children}
      <Footer />
      <Signup />
      <Login />
    </div>
  );
};

export default Base;
