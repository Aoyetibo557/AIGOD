import React from "react";
import "./login.css";
import LogoImage from "../../images/aigod_ftp.png";
import { LoginForm } from "../../components/login/loginform";

const Login = () => {
  return (
    <div className="formpage__container">
      <div className="formpage__topdiv">
        <img
          src={LogoImage}
          alt="Aigod Logo"
          loading="lazy"
          className="formpage_logo_img"
        />
        <h2 className="formpage__subtext">Welcome back oh Mortal!</h2>
      </div>

      <div className="formpage__form__container">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
