import React from "react";
import "./Header.css";
import Navbar from "./navbar/Navbar";
import AI_GOD_Logo from "../../assets/images/aigod_ftp.png";

const Header = () => {
  return (
    <div className="header">
      <div>
        <img className="logo_img" src={AI_GOD_Logo} alt="AIGOD Logo" />
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
