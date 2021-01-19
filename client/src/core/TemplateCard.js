import React from "react";
import { Link } from "react-router-dom";
import "./css/templateCard.css";

const TemplateCard = ({ tempid, tempimage, ctitle, cdiscription }) => {
  return (
    <div className="card-custom">
      <img src={tempimage} alt="" />
      <div className="info-custom">
        <h1>{ctitle}</h1>
        <p>{cdiscription}</p>
        <Link className="button" to={`/user/createresume/${tempid}`}>
          Use This
        </Link>
      </div>
    </div>
  );
};

export default TemplateCard;
