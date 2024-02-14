import React, { useState, useEffect } from "react";
import "./profilecard.css";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Checkbox,
  Avatar,
  Tooltip,
} from "@chakra-ui/react";
import {
  getRoles,
  getUserRoles,
  assignRoles,
  unassignRole,
} from "../../queries/role";
import { BsInfoCircle } from "react-icons/bs";
import { useAuth } from "../../utils/hooks/useAuth";
import { useUser } from "../../utils/hooks/useUser";
import { useUserRoles } from "../../utils/hooks/useUserRoles";

export const ProfileCard = ({ user, onSelect, isSelected }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userRoles, setUserRoles] = useState([]);
  const [checkedRoles, setCheckedRoles] = useState([]);
  const [newUserRoles, setNewUserRoles] = useState([]);
  const [roles, setRoles] = useState([]);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUnassignLoading, setIsUnassignLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { username } = useAuth();
  const { profile } = useUser(username || "");
  const {
    userRoles: currentUserRoles,
    isLoading: isCurrentUserRolesLoading,
    isError,
  } = useUserRoles(profile?.id);

  const handleSelectUser = () => {
    onSelect(user);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const userRolesData = await getUserRoles(user.id);
          if (userRolesData.status === "success") {
            setUserRoles(userRolesData.roles.map((role) => role.role_name));
            setCheckedRoles(userRolesData.roles.map((role) => role.role_id));
          } else {
            setMsg(userRolesData.message);
            setMsgType("error");
          }
        }

        const rolesData = await getRoles();
        if (rolesData.status === "success") {
          setRoles(rolesData.roles);
        } else {
          setMsg(rolesData.message);
          setMsgType("error");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMsg("An error occurred while fetching data");
        setMsgType("error");
      }
    };

    fetchData();
  }, [isSelected, isSubmitted, isUnassignLoading, isLoading]);

  const handleRoleSelect = async (role) => {
    const roleIndex = checkedRoles.indexOf(role.role_id);

    if (newUserRoles.includes(role.role_id)) {
      const newRoles = newUserRoles.filter((roleId) => roleId !== role.role_id);
      setNewUserRoles(newRoles);
    } else {
      setNewUserRoles([...newUserRoles, role.role_id]);
    }

    let updatedRoles = [];

    if (roleIndex === -1) {
      // If the role is not already selected, add it to the list
      updatedRoles = [...checkedRoles, role.role_id];
    } else {
      // If the role is already selected, remove it from the list
      updatedRoles = checkedRoles.filter((roleId) => roleId !== role.role_id);
    }
    setCheckedRoles(updatedRoles);
  };

  const handleAssignRoles = async () => {
    const userdata = {
      userId: user.id,
      roles: newUserRoles,
    };
    setIsLoading(false);
    setIsSubmitted(false);

    try {
      const response = await assignRoles(userdata);
      if (response.status === "success") {
        setMsgType("success");
        setMsg(response.message);
        setIsSubmitted(true);
        setNewUserRoles([]);
      } else {
        setMsg(response.message);
        setMsgType("error");
      }
    } catch (error) {
      console.error("Error assigning roles:", error);
      setMsg("An error occurred while assigning roles");
      setMsgType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnassignRole = async (roleId) => {
    setMsg("");
    const userData = {
      userId: user.id,
      roleId: roleId,
    };
    setIsUnassignLoading(true);
    try {
      const response = await unassignRole(userData);
      if (response.status === "success") {
        setMsgType("success");
        setMsg(response.message);
        setIsSubmitted(true);
      } else {
        setMsg(response.message);
        setMsgType("error");
      }
    } catch (error) {
      console.error("Error unassigning role:", error);
      setMsg("An error occurred while unassigning role");
      setMsgType("error");
    } finally {
      setIsUnassignLoading(false);
    }
  };

  const isAdmin = currentUserRoles.includes("super admin");

  return (
    <div
      className={`profilecard__container ${
        isSelected ? "profilecard__container-selected" : ""
      }`}
      onClick={handleSelectUser}>
      <Avatar size="md" key={user.id} src={`${user.profile_image}`} />
      <div className="profilecard__info">
        <p className="profilecard__info-name">{user.fullname}</p>
        <p className="profilecard__info-email">{user.email}</p>
        <span className="profilecard__info-username">{user.username}</span>
      </div>

      <div>
        <Button size="sm" colorScheme="blue" variant="solid" onClick={onOpen}>
          View Assigned Roles
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className="profilecard__roles-title">
              Assigned Roles
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className={"profilecard__msg__container"}>
                {msg && <p className={`profilecard__msg`}>{msg}</p>}
              </div>
              <div>
                {roles.length > 0 ? (
                  roles.map((role, index) => (
                    <div className="profilecard__roles">
                      <Checkbox
                        key={index}
                        isChecked={checkedRoles.includes(role.role_id)}
                        isDisabled={userRoles.includes(role.role_name)}
                        onChange={() => handleRoleSelect(role)}>
                        <span className="profilecard__roles__name">
                          {role.role_name}
                        </span>
                      </Checkbox>
                      <div>
                        <Tooltip placement="top-start">
                          <BsInfoCircle
                            title={role.description}
                            className="profilecard__roles__info"
                          />
                        </Tooltip>
                      </div>
                      {userRoles.includes(role.role_name) && isAdmin && (
                        <Button
                          size="xs"
                          colorScheme="blue"
                          loadingText="Unassigning..."
                          isLoading={isUnassignLoading}
                          variant="outline"
                          onClick={() => handleUnassignRole(role.role_id)}>
                          Unassign
                        </Button>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No roles found</p>
                )}
              </div>
            </ModalBody>
            <ModalFooter className="profilecard__modal__footer">
              {newUserRoles.length > 0 && isAdmin && (
                <Button
                  size="sm"
                  LoadingText="Assigning..."
                  isLoading={isLoading}
                  colorScheme="blue"
                  variant="solid"
                  onClick={handleAssignRoles}>
                  Assign Roles
                </Button>
              )}
              <Button size="sm" colorScheme="teal" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
