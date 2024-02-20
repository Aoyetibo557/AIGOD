import React, { useState, useEffect } from "react";
import "./adminstyles.css";
import SearchBar from "../searchbar/Searchbar";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/hooks/useAuth";
import { useUser } from "../../utils/hooks/useUser";
import { useUserRoles } from "../../utils/hooks/useUserRoles";
import { RiSearch2Line, RiCloseLine } from "react-icons/ri";
import { Button, useDisclosure } from "@chakra-ui/react";
import { CreateNewRoleModal } from "../modals/createnewrolemodal";

export const AdminHeader = ({ onSearch }) => {
  const { username } = useAuth();
  const { profile } = useUser(username || "");
  const { userRoles, isLoading, isError } = useUserRoles(profile?.id);
  const isAdmin = userRoles?.includes("super admin");
  const isModerator = userRoles?.includes("moderator");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [showSearch, setShowSearch] = useState(false);

  const handleInput = (searchText) => {
    console.log(searchText);
    onSearch(searchText);
  };

  const renderAdminLinks = () => {
    if (isAdmin) {
      return (
        <div className="adminheader__links">
          {!showSearch ? (
            <RiSearch2Line
              onClick={() => setShowSearch(!showSearch)}
              className="adminheader__link adminheader__icon"
            />
          ) : (
            <RiCloseLine
              onClick={() => setShowSearch(!showSearch)}
              className="adminheader__link adminheader__icon"
            />
          )}
          <Link className="adminheader__link" to="/admin">
            Overview
          </Link>
          <Link className="adminheader__link" to="/admin/users">
            Analytics
          </Link>
          <Link className="adminheader__link" to="/admin/cms">
            CMS
          </Link>
          <Link className="adminheader__link" to="/admin/settings">
            Settings
          </Link>
        </div>
      );
    } else if (!isAdmin && isModerator) {
      return (
        <div className="adminheader__links">
          {!showSearch ? (
            <RiSearch2Line
              onClick={() => setShowSearch(!showSearch)}
              className="adminheader__link adminheader__icon"
            />
          ) : (
            <RiCloseLine
              onClick={() => setShowSearch(!showSearch)}
              className="adminheader__link adminheader__icon"
            />
          )}
          <Link className="adminheader__link" to="/admin">
            Overview
          </Link>

          <Link className="adminheader__link" to="/admin/settings">
            Settings
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="adminheader">
      <div>
        <h3>Welcome back, {profile?.fullname || profile?.username} </h3>
        <p>
          Access Role(s)- [{isAdmin && "Super Admin"}
          {isModerator && "Moderator"}]
        </p>
      </div>

      <div className="adminheader__right">
        {showSearch && (
          <SearchBar
            size="md"
            onSearch={handleInput}
            placeholder="Search data..."
            clsx="adminheader__search"
          />
        )}

        {renderAdminLinks()}

        <div>
          {isAdmin && (
            <Button
              colorScheme="blue"
              variant="outline"
              onClick={onOpen}
              className="create__btn"
              disabled={!isAdmin}>
              + Create New Role
            </Button>
          )}
        </div>
      </div>

      <CreateNewRoleModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};
