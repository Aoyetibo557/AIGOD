import React, { useState, useEffect } from "react";
import "../login/loginform.css";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineEmail, MdOutlineLockClock } from "react-icons/md";
import { FaUser, FaIdCard } from "react-icons/fa";
import { registerNewUser } from "../../queries/user";
import {
  isValidUsername,
  isValidEmail,
  isValidPassword,
} from "../../utils/commonfunctions";
import { Tooltip, Button } from "@chakra-ui/react";

export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordCriteriaMet, setPasswordCriteriaMet] = useState({
    length: false,
    specialChar: false,
    uppercase: false,
    lowercase: false,
    digit: false,
  });
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    setUsername(value);
    setUsernameValid(isValidUsername(value));
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordValid(isValidPassword(value));

    // Update password criteria met
    setPasswordCriteriaMet({
      length: value.length >= 8,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      digit: /[0-9]/.test(value),
    });
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const isCriteriaMet = () => {
    return (
      passwordCriteriaMet.length &&
      passwordCriteriaMet.specialChar &&
      passwordCriteriaMet.uppercase &&
      passwordCriteriaMet.lowercase &&
      passwordCriteriaMet.digit
    );
  };

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
      } else if (!usernameValid) {
        setError("Username can only contain alphabet, number, and underscore.");
      } else if (!passwordValid) {
        setError("Password criteria not met.");
      } else if (!isValidEmail(email)) {
        setError("Invalid mail format");
      } else {
        const token = res?.token;
        const uid = res?.user.id;
        // store in localStorage
        localStorage.setItem("aigod_token", token);
        localStorage.setItem("aigod_userId", uid);

        // redirect
        navigate("/chat");
      }
    } catch (error) {
      setError(`${error.message}`);
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
            onFocus={() => setIsPasswordFocused(false)}
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
            onFocus={() => setIsPasswordFocused(false)}
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
            onChange={handleUsernameChange}
            onFocus={() => setIsPasswordFocused(false)}
            className="form__input"
          />
        </div>

        <div className="">
          <div className="form__input__container">
            <MdOutlineLockClock className="form__icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={handlePasswordChange}
              onFocus={handlePasswordFocus}
              className="form__input"
            />
          </div>
          {isPasswordFocused && (
            <div>
              {isCriteriaMet() === false && (
                <div className="form__password__criteria">
                  <span className={passwordCriteriaMet.length ? "met" : ""}>
                    At least 8 characters
                  </span>
                  <span
                    className={passwordCriteriaMet.specialChar ? "met" : ""}>
                    At least 1 special character
                  </span>
                  <span className={passwordCriteriaMet.uppercase ? "met" : ""}>
                    At least 1 uppercase letter
                  </span>
                  <span className={passwordCriteriaMet.lowercase ? "met" : ""}>
                    At least 1 lowercase letter
                  </span>
                  <span className={passwordCriteriaMet.digit ? "met" : ""}>
                    At least 1 digit
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <Button
          isLoading={loading}
          loadingText="Signing Up"
          size="md"
          colorScheme="blue"
          onClick={handleSignUp}>
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
