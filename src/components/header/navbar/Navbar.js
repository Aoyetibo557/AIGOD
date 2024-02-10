import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { MdMenu, MdOutlineClose } from "react-icons/md";
import { verifyToken } from "../../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Avatar } from "antd";
import { FaUser } from "react-icons/fa";
import { Button } from "../../button/button";
import { logOut } from "../../../utils/auth";
import { useAuth } from "../../../utils/hooks/useAuth";
import { useUser } from "../../../utils/hooks/useUser";
const items = [
  {
    key: "1",
    label: (
      <Link className="navbar_list_item" to="/profile">
        Profile
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link className="navbar_list_item" to="/create-new-blog">
        Create New Blog
      </Link>
    ),
  },
  {
    key: "3",
    label: (
      <button className="logout__btn" onClick={logOut}>
        Log Out
      </button>
    ),
  },
  // {
  //   key: "3",
  //   label: <Link to="/setting">Settings</Link>,
  // },
];

const Navbar = () => {
  const { username } = useAuth();
  const { profile } = useUser(username || "");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // remove the user'stokem from local storage
    localStorage.removeItem("aigod_token");

    navigate("/login");
  };

  return (
    <>
      <div className={`navbar ${isMenuOpen ? "mobile-menu-open" : ""}`}>
        <div className="menu_icon" onClick={toggleMenu}>
          {isMenuOpen ? <MdOutlineClose /> : <MdMenu />}
        </div>
        <ul className="navbar_list">
          <Link to="/" className="navbar_list_item">
            Holy Book
          </Link>
          <Link to="/" className="navbar_list_item">
            Sermons
          </Link>
          <Link to="/blog" className="navbar_list_item">
            Blog
          </Link>
          {username ? (
            <Dropdown menu={{ items }}>
              <div className="navbar_avatar">
                <Avatar
                  size={22}
                  style={{
                    backgroundColor: "#eee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#f56a00",
                  }}
                  icon={<FaUser />}
                  src={profile?.profile_image}
                />
                <span>{username}</span>
              </div>
            </Dropdown>
          ) : (
            <>
              <Link to="/login" className="navbar_list_item">
                Login
              </Link>
              <Button
                size="sm"
                type="primary"
                linkTo="/signup"
                className="navbar_list_item">
                Register
              </Button>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
