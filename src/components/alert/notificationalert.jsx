import React from "react";
import "./notificationalert.css";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from "@chakra-ui/react";

export const NotificationAlert = ({ type, message }) => {
  let statusColor = "blue";
  let icon = "info";

  switch (type) {
    case "error":
      statusColor = "red";
      icon = "warning";
      break;
    case "success":
      statusColor = "green";
      icon = "check";
      break;
    default:
      break;
  }

  return (
    <Box
      className={`alert__box-${type}`}
      position="fixed"
      top="7"
      right="8"
      zIndex="9999"
      padding="5px">
      <Alert className="alert" status={type} variant="solid" borderRadius="lg">
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Box>
  );
};
