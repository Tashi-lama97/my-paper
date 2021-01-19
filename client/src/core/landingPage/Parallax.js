import React, { useEffect } from "react";
import PARALLAX from "./images/parallax.jpg";
import M from "materialize-css";
import "./css/parallax.css";

const Parallax = () => {
  useEffect(() => {
    let element = document.querySelectorAll(".parallax");
    let instance = M.Parallax.init(element, {});
    return () => {
      instance[0].destroy();
    };
  }, []);
  return (
    <div className="parallax-container">
      <div className="parallax">
        <img src={PARALLAX} alt="parallax" />
      </div>
    </div>
  );
};

export default Parallax;
