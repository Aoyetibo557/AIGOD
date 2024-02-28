import React, { useState } from "react";
import "./settingscomp.css";
import Layout from "../Layout/layout";
import SettingsLayout from "../Layout/settingslayout";

const Subscription = () => {
  return (
    <Layout>
      <div className="settings__container">
        <SettingsLayout>
          <div className={`account__container`}>
            <div className="account__top">
              <h2>Subscription</h2>
              <span>Coming soon</span>
            </div>
          </div>
        </SettingsLayout>
      </div>
    </Layout>
  );
};

export default Subscription;
