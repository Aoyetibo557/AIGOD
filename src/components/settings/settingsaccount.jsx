import React, { useState, useEffect, useMemo } from "react";
import "./settingscomp.css";
import Layout from "../Layout/layout";
import SettingsLayout from "../Layout/settingslayout";
import { updateUserPassword } from "../../queries/user.js";
import { Button } from "@chakra-ui/react";
import { useUser } from "../../utils/hooks/useUser";
import { useAuth } from "../../utils/hooks/useAuth";

const SettingsAccount = () => {
  const { username: memoizedUsername } = useAuth();
  const { profile } = useUser(memoizedUsername || "");
  const token = useMemo(() => localStorage.getItem("token"), []);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [msgType, setMsgType] = useState("");

  const [updatePassword, setUpdatePassword] = useState(false);

  const handlePasswordReset = async () => {
    setError("");
    setMsgType("");
    setIsLoading(true);
    try {
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        setMsgType("error");
        return;
      }
      if (newPassword.length === 0 || confirmPassword.length === 0) {
        setError("Field(s) cannot be empty");
        setMsgType("error");
        return;
      }
      const response = await updateUserPassword({
        email: profile?.email,
        token: token,
        password: newPassword,
      });
      if (response?.status === "success") {
        setError(response?.message);
        setMsgType("success");
        setNewPassword("");
        setConfirmPassword("");
        setUpdatePassword(false);
      } else {
        setError("Error updating password");
        setMsgType("error");
      }
    } catch (error) {
      setError(error.message);
      setMsgType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="settings__container">
        <SettingsLayout>
          <div className={`account__container`}>
            <div className="account__top">
              <h2>Username</h2>
              <span>
                If you need to change your username, please
                <a href="mailto:allmighty@aigod.ai" className="account__link">
                  {" "}
                  contact
                </a>{" "}
                support.
              </span>
            </div>

            <form className="account__password">
              <div>
                <input
                  className="password__input"
                  name="username"
                  placeholder="username"
                  type="text"
                  value={profile?.username}
                  required
                  disabled
                />
              </div>
            </form>
          </div>
          <div className={`account__container`}>
            <div className="account__top">
              <h2>Password</h2>
              <span>Choose a secure password for your account</span>
              {error && (
                <div
                  className={`account__password__msg account__password__msg--${msgType}`}>
                  {error}
                </div>
              )}
            </div>
            <form className="account__password">
              <div>
                <label className="userprofile__label" htmlFor="password">
                  New Password
                </label>
                <input
                  className="password__input"
                  name="password"
                  placeholder="***************"
                  type="password"
                  value={newPassword}
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="userprofile__label" htmlFor="password">
                  Confirm New Password
                </label>
                <input
                  className="password__input"
                  name="password"
                  placeholder="***************"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button
                size="md"
                colorScheme="white"
                variant="outline"
                marginBottom="15px"
                isLoading={isLoading}
                loadingText="Resetting..."
                onClick={handlePasswordReset}
                className="password__btn">
                save
              </Button>
            </form>
          </div>
        </SettingsLayout>
      </div>
    </Layout>
  );
};

export default SettingsAccount;
