import React from "react";
import "./InfoMain.css";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "../../Rating";

const InfoMain = ({ title, price, description, img }) => {
  return (
    <div className="info-main">
      <h3 className="info-main-item">
        Title: <span className="span-title">{title}</span>
      </h3>
      <h3 className="info-main-item">
        Price: <span className="span-price">{"$" + price}</span>
      </h3>
      <h3 className="info-main-item">
        Rating: <span className="span-rating">{Rating()}</span>
      </h3>
      <h3 className="info-main-item">
        Availability: <span className="span-availability"></span>
      </h3>
      <h3 className="info-description-item">
        Description: <span className="span-description">{description}</span>
      </h3>
    </div>
  );
};

export default InfoMain;
