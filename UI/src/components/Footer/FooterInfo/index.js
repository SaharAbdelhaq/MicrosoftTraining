import React from "react";
import "./FooterInfo.css";
import icon from "./FooterIcon.png";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FooterInfo = () => {
  return (
    <div className="FooterInfo">
      <div className="footer-info-upper">
        <img src={icon} alt="" className="footer-icon" />
        <p className="footer-p">The place for every business owner </p>
      </div>
      <div className="footer-info-links">
        <a href="/#" className="footer-info-link">
          <FontAwesomeIcon icon={brands("google")} />
        </a>
        <a href="/#" className="footer-info-link">
          <FontAwesomeIcon icon={brands("square-facebook")} />
        </a>
        <a href="/#" className="footer-info-link">
          <FontAwesomeIcon icon={brands("whatsapp")} />
        </a>
      </div>
    </div>
  );
};

export default FooterInfo;
