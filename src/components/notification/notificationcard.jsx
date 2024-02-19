import React, { useState } from "react";
import "./notifications.css";
import PropTypes from "prop-types";
import _ from "lodash";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
import { notificationTypes } from "../../utils/const/types";
import { markNotificationAsRead } from "../../queries/notification";

export const NotificationCard = ({
  notificationId,
  type,
  message,
  isRead,
  markAsRead,
  isLoading,
}) => {
  const { isOpen: isModalOpen, onOpen: modalOpen, onClose } = useDisclosure();

  const handleMarkAsRead = async () => {
    try {
      await markNotificationAsRead(notificationId);
      markAsRead(notificationId);
      onClose();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return isLoading ? (
    <div>isLoading...</div>
  ) : (
    <div>
      <div
        title={message}
        aria-label={message}
        className={`notificationcard ${!isRead ? "isNotRead" : "isRead"}`}
        onClick={modalOpen}>
        <div className={`notificationcard__header `}>
          <span className={`notificationcard__type notificationcard__${type}`}>
            {notificationTypes[type]}
          </span>
        </div>
        <div className="notificationcard__msg">{message}</div>
        {!isRead && (
          <Button
            className="notificationcard__btn"
            size="xs"
            colorScheme="blue"
            variant="outline"
            onClick={handleMarkAsRead}>
            Mark as Read
          </Button>
        )}
      </div>
    </div>
  );
};

NotificationCard.propTypes = {
  notificationId: PropTypes.string,
  type: PropTypes.oneOf(Object.values(notificationTypes)),
  message: PropTypes.string,
  isRead: PropTypes.bool,
  markAsRead: PropTypes.func,
  isLoading: PropTypes.bool,
};
