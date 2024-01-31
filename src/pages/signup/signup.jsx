import React from "react";
import "../login/login.css";
import LogoImage from "../../images/aigod_ftp.png";
import { SignupForm } from "../../components/signup/signupform";

const SignupPage = () => {
  return (
    <div className="formpage__container">
      <div className="formpage__topdiv">
        <img
          src={LogoImage}
          alt="Aigod Logo"
          loading="lazy"
          className="formpage_logo_img"
        />
      </div>

      <div className="formpage__form__container">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
