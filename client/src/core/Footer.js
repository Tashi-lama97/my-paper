import React from "react";
import { Link } from "react-router-dom";
import "./css/footer.css";
const Footer = () => {
  return (
    <div className="row footer">
      <div className="col s12 m6 footer-socials center">
        <div className="social-icons">
          <a
            href="https://www.facebook.com/tashi.lama.77128/"
            title="Facebook"
            target="blank"
          >
            <i className="fab fa-facebook"></i>
          </a>
        </div>
        <div className="social-icons">
          <a
            href="https://www.instagram.com/my_paper_22/"
            title="Instagram"
            target="blank"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <div className="social-icons">
          <a
            href="https://github.com/Tashi-lama97"
            title="Github"
            target="blank"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
        <div className="social-icons">
          <a href="https://twitter.com/Tlama40" title="Twitter" target="blank">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
      <div className="col s12 m6 footer-right center">
        <Link
          to={"/contactus"}
          className="waves-effect waves-light btn btn-contact"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default Footer;
