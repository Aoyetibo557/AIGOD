import React from "react";
import "./adminstyles.css";
import PropTypes from "prop-types";
import { Tooltip } from "@chakra-ui/react";
import { IoMdInformationCircleOutline } from "react-icons/io";

export const AdminStatCard = ({ title, value, size, tooltip }) => {
  const getCardSize = () => {
    switch (size) {
      case "small":
        return "admin__statcard--small";
      case "medium":
        return "admin__statcard--medium";
      case "large":
        return "admin__statcard--large";
      default:
        return "admin__statcard--medium";
    }
  };

  return (
    <div
      className={`
      admin__statcard ${getCardSize()}
    `}>
      <div>
        <span>{title}</span>
        <h3>{value}</h3>
      </div>
      <div>
        <Tooltip label={tooltip} aria-label="A tooltip">
          <span>
            <IoMdInformationCircleOutline className={`admin__statcard__icon`} />
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

AdminStatCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
  size: PropTypes.string,
  tooltip: PropTypes.string,
};
