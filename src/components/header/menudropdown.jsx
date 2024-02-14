import React from "react";
import { Dropdown } from "antd";
import { Avatar } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export const MenuDropdown = ({ menuItems, children, profile }) => {
  return (
    <Dropdown menu={{ items: menuItems }}>
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
        <span>{children}</span>
      </div>
    </Dropdown>
  );
};

MenuDropdown.propTypes = {
  menuItems: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  profile: PropTypes.object.isRequired,
};
