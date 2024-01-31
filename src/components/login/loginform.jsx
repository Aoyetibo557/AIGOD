import React, { useState } from "react";
import axios from "axios";
import "./loginform.css";
import { Button } from "../button/button";
import { Link, useNavigate } from "react-router-dom";
import { verifyToken } from "../../utils/auth";
import { MdOutlineLockClock } from "react-icons/md";
import { FaIdCard } from "react-icons/fa";

const API_URL = process.env.REACT_APP_PROD_SERVER_URL;

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        username,
        password,
      });

      if (response.data.status === "error") {
        setError(response.data.message);
        return;
      }

      if (username.length === 0 || password.length === 0) {
        setError("Fields can not be empty!");
      } else {
        const newToken = response.data.token;
        const uid = response.data.user.id;

        localStorage.setItem("aigod_userId", uid);

        // Check if there is an existing 'aigod_token' in local storage
        const existingToken = localStorage.getItem("aigod_token");

        // If an existing token is found, replace it with the new token
        if (existingToken) {
          localStorage.setItem("aigod_token", newToken);
        } else {
          // Otherwise, store the new token
          localStorage.setItem("aigod_token", newToken);
        }

        // Set the new token to the Axios Authorization header for subsequent requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        window.location.href = "/chattest";
      }
    } catch (error) {
      setError("An unexpected error occurred", error.status);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      {error.length > 0 && <div className="form__error">{error}</div>}

      <form className="form__container">
        <div className="form__input__container">
          <FaIdCard className="form__icon" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="form__input"
          />
        </div>

        <div className="form__input__container">
          <MdOutlineLockClock className="form__icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="form__input"
          />
        </div>

        <Button size="md" type="primary" onClick={handleLogin}>
          Login
        </Button>

        {/* <Link className="form__link" to="/forgot-password">
          forgot password?
        </Link> */}
      </form>

      <div className="form__bottom">
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="form__bottom-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
