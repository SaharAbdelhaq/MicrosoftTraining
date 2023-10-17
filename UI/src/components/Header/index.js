import React from "react";
import "./Header.css";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

const Header = () => {
  return (
    <div className="Header">
      <HeaderLeft />
      <HeaderRight />
    </div>
  );
};

export default Header;
