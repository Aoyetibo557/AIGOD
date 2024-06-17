import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { MdMenu, MdOutlineClose } from "react-icons/md";
import { verifyToken } from "../../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../../../utils/hooks/useAuth";
import { useUser } from "../../../utils/hooks/useUser";
import { logOut } from "../../../utils/auth";
import { useUserRoles } from "../../../utils/hooks/useUserRoles";
import { MenuDropdown } from "../menudropdown";
import { NavbarSkeleton } from "../../skeleton/navbarskeleton";
import { UserNotifications } from "../../notification/notifications";

const Navbar = () => {
  const { username } = useAuth();
  const { profile, loading } = useUser(username || "");
  const { userRoles, isLoading, isError } = useUserRoles(profile?.id);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // remove the user'stokem from local storage
    localStorage.removeItem("aigod_token");

    navigate("/login");
  };

  const isAdminUser = userRoles?.includes("super admin");
  const isModerator = userRoles?.includes("moderator");
  const isDev = userRoles?.includes("dev");

  const canViewAdminDashboard = isAdminUser || isModerator;

  const renderRoles = () => {
    if (isAdminUser) return "Admin";
    if (isModerator) return "Moderator";
    if (isDev) return "Developer";
    if (isAdminUser && isModerator) return "Admin";
    if (isAdminUser && isDev) return "Admin";
    if (isModerator && isDev) return "Moderator";
    if (isAdminUser && isModerator && isDev) return "Admin";
  };

  const content = (
    <div className={`content__container`}>
      <div className={`content__container__top`}>
        <div className={`content__div`}>
          <span className={`content__name`}>{profile?.fullname}</span>
          <span className={`content__email`}>{profile?.email}</span>
        </div>
        <span className={`content__role`}>{renderRoles()}</span>
      </div>
      {canViewAdminDashboard && (
        <Link
          className={`content__link`}
          to={`/epikavios/internal-e3gHt7Jp5q/admin`}>
          Dashboard
        </Link>
      )}
      <Link to="/settings/profile" className={`content__link`}>
        Settings
      </Link>

      <Link className={`content__link`} onClick={logOut}>
        Log Out
      </Link>
    </div>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={`navbar ${isMenuOpen ? "mobile-menu-open" : ""}`}>
        <div className="menu_icon" onClick={toggleMenu}>
          {isMenuOpen ? <MdOutlineClose /> : <MdMenu />}
        </div>
        <ul className="navbar_list">
          <Link to="/about" className="navbar_list_item">
            About
          </Link>

          <Link to="/sermons" className="navbar_list_item">
            Sermons
          </Link>

          {username ? (
            <>
              <UserNotifications />
              <MenuDropdown content={content} profile={profile} />
            </>
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
