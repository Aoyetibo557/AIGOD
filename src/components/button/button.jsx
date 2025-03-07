import React from "react";
import "./button.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Button = ({ type, onClick, linkTo, size, children, disabled }) => {
  const buttonStyles = {
    backgroundColor:
      type === "primary"
        ? "#eb00ff"
        : type === "secondary"
        ? "transparent"
        : "",
    color: "white",
    padding: "10px 20px",
    margin: "10px",
    border: type === "secondary" ? `1px solid #eb00ff` : "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: size === "sm" ? "12px" : size === "lg" ? "18px" : "14px",
    pointerEvents: disabled ? "none" : "auto",
  };

  const renderButton = () => {
    switch (type) {
      case "primary":
        return (
          <button
            className="button"
            title={disabled ? "Complete form" : children}
            style={buttonStyles}
            type="button"
            disabled={disabled}
            onClick={onClick}>
            {children}
          </button>
        );
      case "secondary":
        return (
          <button
            className="button"
            style={buttonStyles}
            type="button"
            disabled={disabled}
            onClick={onClick}>
            {children}
          </button>
        );
      case "other":
        return (
          <button
            className="button"
            style={buttonStyles}
            type="button"
            disabled={disabled}
            onClick={onClick}>
            {children}
          </button>
        );
      default:
        return null;
    }
  };

  return linkTo ? <Link to={linkTo}>{renderButton()}</Link> : renderButton();
};

Button.propTypes = {
  type: PropTypes.oneOf(["primary", "secondary", "other"]),
  linkTo: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
