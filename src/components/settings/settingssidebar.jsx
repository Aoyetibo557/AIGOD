import React from "react";
import "./settingscomp.css";
import { Link } from "react-router-dom";

export const SettingSidebar = () => {
  const isActive = (path) => {
    return window.location.pathname === path;
  };

  return (
    <div className={`settings__sidebar`}>
      <Link
        to="/settings/profile"
        className={`settings__link
      ${isActive("/settings/profile") ? "settings__link--active" : ""}
      `}>
        Profile
      </Link>
      <Link
        to="/settings/account"
        className={`settings__link
        ${isActive("/settings/account") ? "settings__link--active" : ""}
      `}>
        Account
      </Link>
      {/* <Link
        to="/settings/subscription"
        className={`settings__link
      ${isActive("/settings/subscription") ? "settings__link--active" : ""}
      `}>
        Subscription
      </Link> */}
    </div>
  );
};
