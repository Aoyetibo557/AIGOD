import React, { useState, useEffect } from "react";
import "../login/loginform.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../button/button";
import { MdOutlineEmail, MdOutlineLockClock } from "react-icons/md";
import { FaUser, FaIdCard } from "react-icons/fa";
import { registerNewUser } from "../../queries/user";

export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    const newUser = {
      fullname,
      email,
      username,
      password,
    };
    try {
      const res = await registerNewUser(newUser);
      setLoading(true);

      if (
        email.length === 0 ||
        fullname.length === 0 ||
        username.length === 0 ||
        password.length === 0
      ) {
        setError("Fields can not be empty!");
      } else {
        const token = res?.token;
        const uid = res?.user.id;
        // store in localStorage
        localStorage.setItem("aigod_token", token);
        localStorage.setItem("aigod_userId", uid);

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
        <div className="form__input__container">
          <FaUser className="form__icon" />
          <input
            type="text"
            placeholder="Full name"
            value={fullname}
            required
            onChange={(e) => setFullname(e.target.value)}
            className="form__input"
          />
        </div>

        <div className="form__input__container">
          <MdOutlineEmail className="form__icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="form__input"
          />
        </div>

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

        <Button size="md" type="primary" onClick={handleSignUp}>
          {loading ? "Loading..." : "Sign Up"}
        </Button>

        <div className="form__bottom">
          <p>
            Have an account?{" "}
            <Link to="/login" className="form__bottom-link">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
