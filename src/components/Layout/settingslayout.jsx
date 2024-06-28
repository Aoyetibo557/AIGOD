import React from "react";
import "./layouts.css";
import { SettingSidebar } from "../settings/settingssidebar";

const SettingLayout = ({ children }) => {
  return (
    <div className={`setting__layout`}>
      <div className={`setting__container`}>
        <h3>Settings</h3>
        <div className={`setting__body`}>
          <SettingSidebar />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingLayout;
