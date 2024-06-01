import React from "react";
import { Flex, Box, Icon, Avatar, useColorModeValue } from "@chakra-ui/react";
import { MdPerson, MdAutoAwesome } from "react-icons/md";
import ReactMarkdown from "react-markdown";

export const MessageItem = ({ message, username, profile }) => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const brandColor = useColorModeValue("brand.500", "white");

  return (
    <Flex
      my="10px"
      position="relative"
      direction={message.role === "user" ? "col" : "row"}>
      <Box
        borderRadius="full"
        border={username && profile ? " " : "1px solid"}
        borderColor={borderColor}
        alignItems="center"
        justify="center"
        bg={
          message.role === "user"
            ? "transparent"
            : "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)"
        }
        me="20px"
        h="40px"
        minH="40px"
        minW="40px">
        {username && profile && message.role === "user" ? (
          <Avatar name={profile?.fullname} src={profile?.profile_image} />
        ) : (
          <Icon
            as={message.role === "user" ? MdPerson : MdAutoAwesome}
            width="20px"
            height="20px"
            color={message.role === "user" ? brandColor : "white"}
            cursor="pointer"
          />
        )}
      </Box>
      <Flex
        p="14px"
        borderRadius="8px"
        className="chat__content__container"
        w="100%"
        color={message.role === "user" ? "white" : "white"}>
        <ReactMarkdown className="font-medium chat__content">
          {message.content}
        </ReactMarkdown>
      </Flex>
    </Flex>
  );
};
