import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../login/loginform.css";
import { sendPasswordResetLink } from "../../queries/user";
import { Button } from "../button/button";
import LogoImage from "../../images/aigod_ftp.png";
import _ from "lodash";

export const SendResetLink = () => {
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    if (!_.isEmpty(email)) {
      try {
        const response = await sendPasswordResetLink(email);
        if (response.status === "success") {
          setEmail("");
          setSuccessMsg(response?.message);
        } else {
          setErrorMsg(response?.message);
        }
      } catch (error) {
        console.error(
          `Error handling send request for password reset: ${error.message}`
        );
      }
    } else {
      setErrorMsg("Please enter a valid email address");
    }
  };

  return successMsg ? (
    <div className="resetform__msg__container">
      <img
        src={LogoImage}
        alt="Aigod Logo"
        loading="eager"
        className="resetform__logo__img"
      />
      <div className="resetform__msg">{successMsg}</div>
    </div>
  ) : (
    <div className="resetform__container">
      <div className="resetform__topdiv">
        <h3>Reset your password</h3>
        <p>Please enter your email</p>
      </div>
      <form onSubmit={handleReset} className="resetform__form">
        <div>
          {errorMsg && (
            <div className="error__msg">
              <p>{errorMsg}</p>
            </div>
          )}
        </div>
        <input
          type="email"
          name="email"
          required
          aria-label="email"
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
