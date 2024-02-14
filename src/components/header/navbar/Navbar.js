import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { MdMenu, MdOutlineClose } from "react-icons/md";
import { verifyToken } from "../../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
// import { Button } from "../../button/button";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../../../utils/hooks/useAuth";
import { useUser } from "../../../utils/hooks/useUser";
import { logOut } from "../../../utils/auth";
import { useUserRoles } from "../../../utils/hooks/useUserRoles";
import { MenuDropdown } from "../menudropdown";
import { NavbarSkeleton } from "../../skeleton/navbarskeleton";

const Navbar = () => {
  const { username } = useAuth();
  const { profile } = useUser(username || "");
  const { userRoles, isLoading, isError } = useUserRoles(profile?.id);

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
        <button className="logout__btn" onClick={logOut}>
          Log Out
        </button>
      ),
    },
  ];

  const isAdminUser =
    userRoles?.includes("super admin") || userRoles?.includes("moderator");

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
          <Link to="/blogs" className="navbar_list_item">
            Blog
          </Link>

          {isAdminUser && (
            <Button
              size="sm"
              colorScheme="blue"
              variant="solid"
              style={{
                borderRadius: "50px",
                color: "#fff",
                fontWeight: "400",
              }}
              className="">
              <Link to={`/epikavios/internal-e3gHt7Jp5q/admin`}>Dashboard</Link>
            </Button>
          )}
          {username ? (
            <MenuDropdown menuItems={items} profile={profile}>
              {username}
            </MenuDropdown>
          ) : (
            <>
              <Link to="/login" className="navbar_list_item">
                Login
              </Link>
              <Button size="sm" type="primary" colorScheme="blue">
                <Link to="/signup">Register</Link>
              </Button>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;

/**
 *  <Dropdown menu={{ items }}>
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
 */
