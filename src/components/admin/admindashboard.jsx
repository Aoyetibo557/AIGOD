// AdminDashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import "./adminstyles.css";
import SearchBar from "../searchbar/Searchbar";
import { Button, useDisclosure } from "@chakra-ui/react";
import { ProfileCard } from "../profilecard/profilecard";
import { findUsersByUserName } from "../../queries/user";
import { CreateNewRoleModal } from "../modals/createnewrolemodal";
import { debounce } from "lodash";

const AdminDashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
  const [input, setInput] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInput = debounce(async (searchText) => {
    setInput(searchText);
    try {
      if (searchText.length <= 1) {
        setFoundUsers([]); // Clear the found users list if the input is too short
      } else {
        const res = await findUsersByUserName(searchText);
        if (res.status === "success") {
          setFoundUsers(res.users);
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, 300);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="admin__dashboard">
      <div className="admin__top">
        <SearchBar size="lg" onSearch={handleInput} />

        <div>
          <Button colorScheme="blue" variant="solid" onClick={onOpen}>
            + Create New Role
          </Button>
        </div>
      </div>
      <div className="admin__userslist">
        {foundUsers?.map((user) => (
          <ProfileCard
            key={user.id}
            user={user}
            onSelect={handleSelectUser}
            isSelected={user.id === selectedUser?.id}
          />
        ))}
      </div>
      <div>
        {input.length > 1 && foundUsers.length < 1 && (
          <p>No users found with username: {input}</p>
        )}
      </div>
      {/* <div>
        {selectedUser && (
          <RolesSection
            selectedUser={selectedUser}
            onRoleSelect={handleRoleSelect}
          />
        )}
      </div> */}

      <CreateNewRoleModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default AdminDashboard;
