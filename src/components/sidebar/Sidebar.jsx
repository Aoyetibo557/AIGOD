"use client";
import React, { PropsWithChildren } from "react";

// chakra imports
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  Text,
  Center,
  Input,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
// import Content from "@/components/sidebar/components/Content";
// import {
//   renderThumb,
//   renderTrack,
//   renderView,
// } from "@/components/scrollbar/Scrollbar";
import { Scrollbars } from "react-custom-scrollbars-2";

import { IoMenuOutline } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";

function Sidebar(props) {
  const { routes } = props;
  // this is for the rest of the collapses
  let variantChange = "0.2s linear";
  let shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  // Chakra Color Mode
  let sidebarBg = useColorModeValue("white", "navy.800");
  let sidebarRadius = "14px";
  let sidebarMargins = "0px";
  // SIDEBAR
  return (
    <Box
      display={{ base: "none", xl: "block" }}
      position="fixed"
      minH="100%"
      // pt="calc(215px - 74.8px)"
    >
      <Box
        bg={sidebarBg}
        backgroundColor="transparent"
        transition={variantChange}
        borderRight="1px"
        borderColor="white"
        w="285px"
        ms={{
          sm: "16px",
        }}
        my={{
          sm: "16px",
        }}
        h="calc(100vh - 32px)"
        m={sidebarMargins}
        minH="100%"
        overflowX="hidden"
        boxShadow={shadow}>
        <Flex background="transparent" display={"block"} pl="50px">
          <Center justifyContent={"left"} mb="10px">
            <Text
              fontSize="md"
              color="white"
              mr="5px"
              display={"flex"}
              alignContent={"center"}>
              View history
            </Text>
            <BsArrowRight color="white" />
          </Center>
          <Input
            border="1px solid"
            borderRadius="45px"
            w="90%"
            me="10px"
            fontSize="sm"
            backgroundColor="white"
            fontWeight="500"
            placeholder="Type your message here..."
          />
        </Flex>
      </Box>
    </Box>
  );
}

// FUNCTIONS
export function SidebarResponsive(props) {
  let sidebarBackgroundColor = useColorModeValue("white", "navy.800");
  let menuColor = useColorModeValue("gray.400", "white");
  // // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();

  function isWindowAvailable() {
    return typeof window !== "undefined";
  }

  const { routes } = props;
  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems="center">
      <Flex w="max-content" h="max-content" onClick={onOpen}>
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          my="auto"
          w="20px"
          h="20px"
          me="10px"
          _hover={{ cursor: "pointer" }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={
          isWindowAvailable() && document.documentElement.dir === "rtl"
            ? "right"
            : "left"
        }>
        <DrawerOverlay />
        {/* <DrawerContent
          w="285px"
          maxW="285px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          borderRadius="16px"
          bg={sidebarBackgroundColor}>
          <DrawerCloseButton
            zIndex="3"
            onClick={onClose}
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="285px" px="0rem" pb="0">
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}>
              <Content routes={routes} />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent> */}
      </Drawer>
    </Flex>
  );
}
// PROPS

export default Sidebar;
