import React, { lazy } from "react";
import "./profile.css";
import Layout from "../../components/Layout/layout";

const UserProfile = lazy(() => import("../../components/profile/userprofile"));

const Profile = () => {
  return (
    <Layout>
      <div className="profile__container">
        <UserProfile />
      </div>
    </Layout>
  );
};

export default Profile;
