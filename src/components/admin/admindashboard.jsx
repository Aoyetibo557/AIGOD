// AdminDashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import "./adminstyles.css";
import SearchBar from "../searchbar/Searchbar";
import AdminLogs from "./_logs/adminlogs";
import { AdminHeader } from "./adminheader";
import { ProfileCard } from "../profilecard/profilecard";
import { findUsersByUserName } from "../../queries/user";
import { debounce } from "lodash";
import { useAuth } from "../../utils/hooks/useAuth";
import { useUser } from "../../utils/hooks/useUser";
import { useUserRoles } from "../../utils/hooks/useUserRoles";
import { getAllUsersWithRoles } from "../../queries/admin";

const AdminDashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);

  const { username } = useAuth();
  const { profile } = useUser(username || "");
  const { userRoles, isLoading, isError } = useUserRoles(profile?.id);

  const isAdmin = userRoles?.includes("super admin");

  const handleInput = debounce(async (searchText) => {
    setInput(searchText.toLowerCase());
  }, 300);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const getRoleUsers = useMemo(() => {
    const fetchUsers = async () => {
      const res = await getAllUsersWithRoles();
      if (res.status === "success") {
        setUsers(res.users);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return (
        user.username.toLowerCase().includes(input) ||
        user.email.toLowerCase().includes(input) ||
        user.fullname.toLowerCase().includes(input)
      );
    });
  }, [input, users]);

  return (
    <div className="admin__dashboard">
      <AdminHeader onSearch={handleInput} isAdmin={isAdmin} />
      <div className="admindashboard__container">
        <div>
          <h3 className="admin__h3">Active Users Roles </h3>
          <div className="admin__userslist">
            {filteredUsers?.map((user) => (
              <ProfileCard
                key={user.id}
                user={user}
                onSelect={handleSelectUser}
                isSelected={user.id === selectedUser?.id}
              />
            ))}
          </div>
          <div className="no__result">
            {input.length > 1 && filteredUsers.length < 1 && (
              <p>No users found with username: {input}</p>
            )}
          </div>
        </div>

        <div className="admin__logs">
          <AdminLogs />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
