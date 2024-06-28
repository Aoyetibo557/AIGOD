import React from "react";
import { Dropdown, Popover } from "antd";
import { Avatar } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export const MenuDropdown = ({ content, profile }) => {
  return (
    <Popover placement="bottomRight" content={content} trigger="click">
      <div className="navbar_avatar">
        <Avatar
          size="sm"
          style={{
            backgroundColor: "#eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#f56a00",
          }}
          icon={<FaUser />}
          src={profile?.profile_image}
        />
      </div>
    </Popover>
  );
};

MenuDropdown.propTypes = {
  content: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
