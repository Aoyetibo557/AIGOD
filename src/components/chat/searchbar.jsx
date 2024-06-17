import React from "react";
import { Flex, Input, Text, Button, useColorModeValue } from "@chakra-ui/react";

export const SearchBar = ({
  userInput,
  handleChange,
  handleTranslate,
  loading,
  chatError,
}) => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const inputColor = useColorModeValue("navy.700", "white");
  const placeholderColor = useColorModeValue(
    { color: "gray.500" },
    { color: "whiteAlpha.600" }
  );

  return (
    <div>
      <Flex
        position="fixed"
        top="70px"
        width="100%"
        zIndex="1000"
        marginTop="30px"
        marginBottom="40px"
        alignItems="center"
        justifySelf="flex-end">
        <Input
          minH="54px"
          width="60vw"
          border="1px solid"
          borderColor={borderColor}
          borderRadius="16px"
          p="0px 20px"
          me="10px"
          fontSize="sm"
          backgroundColor="white"
          fontWeight="500"
          _focus={{ borderColor: "none" }}
          color={inputColor}
          _placeholder={placeholderColor}
          placeholder="Type your message here..."
          value={userInput}
          onChange={handleChange}
        />
        <Button
          fontSize="sm"
          colorScheme="purple"
          size="md"
          borderRadius="8px"
          color="white"
          _hover={{
            boxShadow: "0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important",
            bg: "#EB00FF  !important",
          }}
          onClick={handleTranslate}
          isLoading={loading}>
          Ask God
        </Button>
      </Flex>
    </div>
  );
};
