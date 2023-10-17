import React from "react";
import "./HeaderRight.css";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeaderRight = () => {
  return (
    <div className="HeaderRight">
      <a href="/#">
        <div className="header-profile-btn">
          <FontAwesomeIcon icon={regular("user")} />
          <h3 className="header-btn">ME</h3>
        </div>
      </a>
      <a href="/#">
        <div className="header-favorites-btn">
          <FontAwesomeIcon icon={regular("heart")} />
          <div className="header-favorites-count">0 </div>
        </div>
      </a>
      <a href="/#" className="header-signOut-btn">
        <h3 className="header-btn">Sign out</h3>
      </a>
    </div>
  );
};

export default HeaderRight;
