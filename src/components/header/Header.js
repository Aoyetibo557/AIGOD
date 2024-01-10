import React from "react";
import "./Header.css";
import Navbar from "./navbar/Navbar";
import AI_GOD_Logo from "../../images/aigod_ftp.png";

const Header = () => {
  return (
    <div className="header">
      <a href="/" rel="noreferrer">
        <img className="logo_img" src={AI_GOD_Logo} alt="AIGOD Logo" />
      </a>
      {/* <Navbar /> */}
    </div>
  );
};

export default Header;
