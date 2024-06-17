import React from "react";
import { Flex } from "@chakra-ui/react";
import { MessageItem } from "./messageitem";

export const MessageList = ({ messages, username, profile }) => {
  return (
    <div
      style={{
        marginTop: "100px",
      }}>
      {messages.map(
        (message, index) =>
          message.content && (
            <MessageItem
              key={index}
              message={message}
              username={username}
              profile={profile}
            />
          )
      )}
    </div>
  );
};
