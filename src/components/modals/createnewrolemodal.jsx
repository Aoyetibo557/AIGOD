import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { createUserRole } from "../../queries/role";

export const CreateNewRoleModal = ({ isOpen, onClose }) => {
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [error, setError] = useState("");

  const handleRoleInput = (e) => {
    const { name, value } = e.target;
    if (name === "roleName") {
      setRoleName(value);
    } else {
      setRoleDescription(value);
    }
  };

  const handleOnClose = () => {
    setRoleName("");
    setRoleDescription("");
    setError("");
    onClose();
  };

  // validate role name and description
  const sanitizeInput = (input) => {
    return input.trim().toLowerCase();
  };

  const handleCreateRole = async () => {
    const sanitizedName = sanitizeInput(roleName);
    const sanitizedDescp = sanitizeInput(roleDescription);
    setError("");

    if (!sanitizedName || !sanitizedDescp) {
      setError("Role name and description are required");
      return;
    }

    const roleData = {
      roleName: sanitizedName,
      roleDescription: sanitizedDescp,
    };

    try {
      const response = await createUserRole(roleData);
      if (response.status === "success") {
        setRoleName("");
        setRoleDescription("");
        setError("");
        onClose();
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error("Error creating role:", error);
      setError("Error creating role");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Role</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form className="modal__form">
            {error && <p className="modal__error">{error}</p>}
            <div className="modal__form__div">
              <label htmlFor="roleName">Role Name</label>
              <input
                type="text"
                id="roleName"
                name="roleName"
                required
                value={roleName}
                onChange={handleRoleInput}
                className="modal__input"
              />
            </div>
            <div className="modal__form__div">
              <label htmlFor="roleDescription">Role Description</label>
              <input
                type="text"
                id="roleDescription"
                name="roleDescription"
                required
                value={roleDescription}
                onChange={handleRoleInput}
                className="modal__input"
              />
            </div>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            md
            variant="solid"
            colorScheme="blue"
            mr={3}
            onClick={handleCreateRole}>
            Create Role
          </Button>

          <Button
            size="md"
            variant="outline"
            colorScheme="red"
            onClick={handleOnClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
