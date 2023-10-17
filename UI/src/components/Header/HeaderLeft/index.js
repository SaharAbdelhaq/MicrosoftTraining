import React from "react";
import "./HeaderLeft.css";
import icon from "./icon.png";

const HeaderLeft = () => {
  return (
    <div className="HeaderLeft">
      <img src={icon} alt="" className="header-icon" />
      <div className="header-search">
        <input type="text" className="header-search-input" />
        <button className="header-search-btn">search</button>
      </div>
    </div>
  );
};

export default HeaderLeft;
