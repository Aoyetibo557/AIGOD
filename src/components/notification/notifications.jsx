import React, { useState, useEffect, useMemo } from "react";
import { BsBell } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import "./notifications.css";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Switch,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { NotificationCard } from "./notificationcard";
import { useUserRoles } from "../../utils/hooks/useUserRoles";
import { useAuth } from "../../utils/hooks/useAuth";
import { useUser } from "../../utils/hooks/useUser";
import { getUserNotification } from "../../queries/notification";

export const UserNotifications = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notifications, setNotifications] = useState([]);
  const placement = "right";
  const [showUnread, setShowUnread] = useState(true);
  const [isMarked, setIsMarked] = useState(false);
  const { username } = useAuth();
  const { profile } = useUser(username || "");
  const {
    userRoles,
    isLoading: roleLoading,
    isError,
  } = useUserRoles(profile?.id);
  const [isLoading, setIsLoading] = useState(false);

  const filterNotifications = (notifications) => {
    if (showUnread) {
      return notifications.filter((notification) => !notification.isread);
    }
    return notifications;
  };

  const handleMarkAsRead = (notificationId) => {
    setIsLoading(true);
    setIsMarked(true);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const response = await getUserNotification(profile?.id);
        setNotifications(filterNotifications(response.notifications)); // Filter notifications based on showUnread
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && profile?.id) {
      fetchNotifications();
    }
  }, [isOpen, profile?.id, showUnread, isMarked]);

  return (
    <div>
      <BsBell onClick={onOpen} className="notification__icon" />
      <div>
        <Drawer
          size="sm"
          className="drawer"
          placement={placement}
          onClose={onClose}
          isOpen={isOpen}>
          <DrawerOverlay className="drawer">
            <DrawerContent>
              <DrawerHeader className="drawer__header">
                <div>Notifications</div>
                <div className="drawer__togglecontainer">
                  <p className="drawer__toggletext">Only show unread</p>
                  <Switch
                    size="sm"
                    isChecked={showUnread}
                    onChange={() => setShowUnread(!showUnread)}
                    aria-label="Show Unread Notifications"
                  />
                </div>
                <Button size="sm" onClick={onClose}>
                  <MdClose className="drawer__closebtn" />
                </Button>
              </DrawerHeader>
              <DrawerBody>
                {notifications?.length > 0 ? (
                  notifications?.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notificationId={notification.id}
                      type={notification.type}
                      message={notification.message}
                      isRead={notification.isread}
                      isLoading={isLoading}
                      markAsRead={handleMarkAsRead}
                    />
                  ))
                ) : (
                  <div className="notificationcard__none">No Notifications</div>
                )}
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </div>
    </div>
  );
};
