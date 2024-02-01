import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../login/loginform.css";
import { sendPasswordResetLink } from "../../queries/user";
import { Button } from "../button/button";
import LogoImage from "../../images/aigod_ftp.png";

export const SendResetLink = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await sendPasswordResetLink(email);
      console.log(response);

      if (response.data.status === "success") {
        setEmail("");
        setMsg(response?.data.message);
      }
    } catch (error) {
      console.error(
        `Error handling send request for password reset: ${error.message}`
      );
    }
  };

  return msg ? (
    <div className="resetform__msg__container">
      <img
        src={LogoImage}
        alt="Aigod Logo"
        loading="eager"
        className="resetform__logo__img"
      />
      <div className="resetform__msg">{msg}</div>
    </div>
  ) : (
    <div className="resetform__container">
      <div className="resetform__topdiv">
        <h3>Reset your password</h3>
        <p>Please enter your email</p>
      </div>
      <form onSubmit="handleReset" className="resetform__form">
        <input
          type="email"
          name="email"
          required
          aria-lable="email"
          placeholder="unique@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="resetform__input"
        />

        <Button size="md" type="primary" onClick={handleReset}>
          Reset password
        </Button>
      </form>
      <div className="form__bottom">
        Return to{" "}
        <Link to="/login" className="form__link">
          Login
        </Link>
      </div>
    </div>
  );
};
