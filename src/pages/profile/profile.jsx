import React, { lazy } from "react";
import "./profile.css";
import Layout from "../../components/Layout/layout";
import SettingLayout from "../../components/Layout/settingslayout";
import { SettingSidebar } from "../../components/settings/settingssidebar";
const UserProfile = lazy(() => import("../../components/profile/userprofile"));

const Profile = () => {
  return (
    <Layout>
      <div className="profile__container">
        <SettingLayout>
          <UserProfile />
        </SettingLayout>
      </div>
    </Layout>
  );
};

export default Profile;
