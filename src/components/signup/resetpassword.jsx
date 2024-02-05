import React, { useState, useEffect } from "react";
import Layout from "../Layout/layout";
import { useParams, Link } from "react-router-dom";
import "../login/loginform.css";
import { Button } from "../button/button";
import { validatePasswordResetToken, updatePassword } from "../../queries/user";

function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [validMsg, setValidMsg] = useState("");
  const [formErrMsg, setFormErrMsg] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { token } = useParams();

  const checkPasswordMatch = () => {
    return password === confirmPassword;
  };

  const handlePasswordUpdate = async () => {
    const queryData = {
      email,
      token,
      password,
    };

    const res = await updatePassword(queryData);
    console.log(res);
    if (res.status === "success") {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setSuccessMsg(res.message);
    }
    setFormErrMsg(res?.message);
  };
  useEffect(() => {
    setPasswordErr("");
    if (!checkPasswordMatch()) {
      setPasswordErr("Passwords must match");
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    const handlePasswordTokenValidation = async () => {
      const res = await validatePasswordResetToken(token);
      setIsValid(res?.status === "success");
      setValidMsg(res?.message || "An Error Occured");
    };

    handlePasswordTokenValidation();
  }, []);

  return (
    <Layout>
      {!isValid ? (
        <div className="resetform__container">{validMsg}</div>
      ) : (
        <div className="resetform__container">
          {successMsg ? (
            <div className="resetform__topdiv">
              <h4>{successMsg}</h4>
              <div>
                Return to{" "}
                <Link className="form__link" to="/login">
                  Login
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="resetform__topdiv">
                <h4>Create a new passowrd</h4>
              </div>
              <form className="resetform__form">
                {formErrMsg?.length > 0 && (
                  <p className="form__error">{formErrMsg}</p>
                )}
                <div className="resetform__div">
                  <label html="email"> Email</label>
                  <input
                    type="email"
                    placeholder="yourmail@mail.com"
                    required
                    className="resetform__input"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="resetform__div">
                  <label html="password"> New Password</label>
                  <input
                    type="password"
                    placeholder="*************"
                    required
                    className="resetform__input"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="resetform__div">
                  <label html="confirm-password"> Confirm Password</label>
                  <input
                    type="password"
                    placeholder="**************"
                    required
                    className="resetform__input"
                    name="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {passwordErr.length > 0 && (
                    <p className="error__msg">{passwordErr}</p>
                  )}
                </div>

                <div className="resetform__div">
                  <Button
                    size="md"
                    type="primary"
                    disabled={passwordErr !== ""}
                    onClick={handlePasswordUpdate}>
                    Reset Password
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </Layout>
  );
}

export default ResetPasswordForm;
