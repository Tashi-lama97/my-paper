import React from "react";
import "./css/socialCard.css";

const SocialCard = ({
  iconBackground = "#61dbfb",
  socialCardIcon = "fa-react",
  linkData = "#",
  idTitle = "ID ID ID",
  dis = "discrioption",
}) => {
  return (
    <div className="socialCardWarpper">
      <div className="cardFace face1  z-depth-3">
        <a href={linkData} target="_blank" className="socialIdTitle">
          {idTitle}
        </a>
        <p className="socialCardDiscription">{dis}</p>
      </div>
      <div className="cardFace face2" style={{ background: iconBackground }}>
        <div className="socialCardIcon">
          <i className={"socialIcons fab " + socialCardIcon}></i>
        </div>
      </div>
    </div>
  );
};

export default SocialCard;
