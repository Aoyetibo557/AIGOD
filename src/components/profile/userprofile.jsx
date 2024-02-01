import React, { useState, useEffect } from "react";
import axios from "axios";
import "./userprofile.css";
import { Avatar } from "antd";
import { verifyToken } from "../../utils/auth";
import { getUserProfile, updateUser } from "../../queries/user";
import { Button } from "../button/button";
import { formatDate } from "../../utils/commonfunctions";

const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_SERVER_URL
    : process.env.REACT_APP_PROD_SERVER_URL;

const UserProfile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uid, setUid] = useState("");
  const [username, setUsername] = useState("");
  const [tokenUsername, setTokenUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [error, setError] = useState("");
  const [originalData, setOriginalData] = useState({});
  const [hasChanged, setHasChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const user = await verifyToken();
      setIsLoggedIn(!!user);
      setUsername(user);
      setTokenUsername(user);
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        if (username.length > 0) {
          const userProfile = await getUserProfile(username);
          setUid(userProfile?.id);
          setOriginalData(userProfile); // Save the original data
          setUsername(userProfile?.username);
          setFullname(userProfile?.fullname);
          setEmail(userProfile?.email);
          setCreatedDate(userProfile?.created_date);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [tokenUsername]);

  const handleInputChange = (field, value) => {
    // Update the state and set hasChanged to true if the value has changed
    if (originalData[field] !== value) {
      setHasChanged(true);
    } else {
      setHasChanged(false);
    }

    switch (field) {
      case "username":
        setUsername(value);
        break;
      case "fullname":
        setFullname(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleUpdate = async () => {
    setError("");
    try {
      if (hasChanged) {
        const updatedData = {};

        if (originalData.fullname !== fullname) {
          updatedData.fullname = fullname;
        }
        if (originalData.email !== email) {
          updatedData.email = email;
        }
        if (originalData.username !== username) {
          updatedData.username = username;
        }

        const response = await updateUser(uid, updatedData);
        if (response?.data.user) {
          setHasChanged(false);
          setError("Profile Updated Sucessfully!");
        } else {
          setError("Error Updating Profile");
        }
      } else {
        setError("No chnages detected!");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return loading ? (
    <div>Loading pRofile...</div>
  ) : (
    <div className="userprofile__container">
      {error.length > 0 && <p className="error_msg">{error}</p>}
      <div className="userprofile__avater__container">
        <Avatar
          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${username}`}
          size={60}
          className="userprofile__avatar"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#f56a00",
          }}
        />

        <div className="userprofile__avater__container-info">
          <div className="info-username">@{username}</div>
          <div>
            <span className="info-sub-span">Joined</span>
            <span className="info-sub-date">{formatDate(createdDate)}</span>
          </div>
        </div>
      </div>

      <form className="userprofile__form">
        {/* <div>
          <label className="userprofile__label" htmlFor="username">
            Username
          </label>
          <input
            className="userprofile__input"
            name="username"
            value={username}
            onChange={(e) => handleInputChange("username", e.target.value)}
          />
        </div> */}

        <div>
          <label className="userprofile__label" htmlFor="fullname">
            Full Name
          </label>
          <input
            className="userprofile__input"
            name="fullname"
            value={fullname}
            onChange={(e) => handleInputChange("fullname", e.target.value)}
          />
        </div>

        <div>
          <label className="userprofile__label" htmlFor="email">
            Email
          </label>
          <input
            className="userprofile__input"
            name="email"
            value={email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>

        <div>
          <label className="userprofile__label" htmlFor="password">
            Password
          </label>
          <input
            className="userprofile__input"
            name="password"
            placeholder="***************"
            value={password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
        </div>

        {hasChanged && (
          <Button size="md" type="primary" onClick={handleUpdate}>
            save changes
          </Button>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
