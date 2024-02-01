import React, { lazy } from "react";
import Layout from "../../components/Layout/layout";
import { SendResetLink } from "../../components/signup/sendresetlink";
import "./forgotpassword.css";

const ForgotPassword = () => {
  return (
    <Layout>
      <div className="forgotpassword__container">
        <div className="forgotpassword__form">
          <SendResetLink />
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
