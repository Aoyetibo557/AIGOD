// AdminDashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import "./adminstyles.css";
import SearchBar from "../searchbar/Searchbar";
import { AdminHeader } from "./adminheader";
import { ProfileCard } from "../profilecard/profilecard";
import { findUsersByUserName } from "../../queries/user";
import { debounce } from "lodash";
import { useAuth } from "../../utils/hooks/useAuth";
import { useUser } from "../../utils/hooks/useUser";
import { useUserRoles } from "../../utils/hooks/useUserRoles";

const AdminDashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
  const [input, setInput] = useState("");

  const { username } = useAuth();
  const { profile } = useUser(username || "");
  const { userRoles, isLoading, isError } = useUserRoles(profile?.id);

  const isAdmin = userRoles?.includes("super admin");
  const handleInput = debounce(async (searchText) => {
    setInput(searchText.toLowerCase());
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
      <AdminHeader onSearch={handleInput} isAdmin={isAdmin} />

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
    </div>
  );
};

export default AdminDashboard;
