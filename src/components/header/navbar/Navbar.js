import React, { useState } from "react";
import "./Navbar.css";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div className={`navbar ${isMenuOpen ? "mobile-menu-open" : ""}`}>
        <div className="menu_icon" onClick={toggleMenu}>
          <MdMenu />
        </div>
        <ul className="navbar_list">
          <li className="navbar_list_item">Holy Book</li>
          <li className="navbar_list_item">Sermons</li>
          <li className="navbar_list_item">Blog</li>
          <li className="navbar_list_item">Login</li>
          <li className="navbar_list_item">Register</li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
