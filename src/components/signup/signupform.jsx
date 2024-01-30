import React, { useState, useEffect } from "react";
import "../login/loginform.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../button/button";
import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";

export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${API_URL}/user/signup`, {
        fullName,
        email,
        username,
        password,
      });
      setLoading(true);

      if (
        email.length === 0 ||
        fullName.length === 0 ||
        username.length === 0 ||
        password.length === 0
      ) {
        setError("Fields can not be empty!");
      } else {
        const token = response.data.token;

        // store in localStorage
        localStorage.setItem("aigod_token", token);
        // redirect
        navigate("/chattest");
      }
    } catch (error) {
      setError(`Error Message: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error.length > 0 && <div className="form__error">{error}</div>}

      <form className="form__container">
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="form__input"
        />

        <input
          type="text"
          placeholder="Full name"
          value={fullName}
          required
          onChange={(e) => setFullname(e.target.value)}
          className="form__input"
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
          className="form__input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="form__input"
        />

        <Button size="md" type="primary" onClick={handleSignUp}>
          {loading ? "Loading..." : "Sign Up"}
        </Button>

        <Link className="form__link" to="/login">
          or Login with Email
        </Link>
      </form>

      <div className="form__bottom">
        <p>
          Have an account?{" "}
          <Link to="/login" className="form__bottom-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
