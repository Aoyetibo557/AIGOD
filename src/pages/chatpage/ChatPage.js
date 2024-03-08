import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Text,
  useColorModeValue,
  ChakraProvider,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { MdAutoAwesome, MdBolt, MdEdit, MdPerson } from "react-icons/md";

import Sidebar from "../../components/sidebar/Sidebar";
import "../../styles/App.css";
import "../../styles/Contact.css";
import "../../styles/Plugins.css";
import "../../styles/MiniCalendar.css";
import Header from "../../components/header/Header";
import { useChatbot } from "../../utils/hooks/useChatbot";

export default function ChatPage() {
  const {
    sendMessage,
    handleResponse,
    registerGuestUser,
    getChatHistory,
    loading: hookLoading,
    error,
  } = useChatbot();

  const url = process.env.REACT_APP_API_URL;

  const [inputOnSubmit, setInputOnSubmit] = useState("");
  const [version, setVersion] = useState("hybrid");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "",
    },
  ]);

  // ChatGPT model
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [webUrl, setWebUrls] = useState("");
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(hookLoading);
  const [chat, setChat] = useState(false);
  const [maxWidth, setMaxWidth] = useState(false);
  const [activeDrags, setActiveDrags] = useState(0);
  const [chatError, setChatError] = useState(error || "");

  const public_path = process.env.REACT_APP_PUBLIC_URL;

  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const inputColor = useColorModeValue("navy.700", "white");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgIcon = useColorModeValue(
    "linear-gradient(180deg, #FBFBFF 0%, #CACAFF 100%)",
    "whiteAlpha.200"
  );
  const brandColor = useColorModeValue("brand.500", "white");
  const buttonBg = useColorModeValue("white", "whiteAlpha.100");
  const gray = useColorModeValue("gray.500", "white");
  const buttonShadow = useColorModeValue(
    "14px 27px 45px rgba(112, 144, 176, 0.2)",
    "none"
  );
  const textColor = useColorModeValue("navy.700", "white");
  const placeholderColor = useColorModeValue(
    { color: "gray.500" },
    { color: "whiteAlpha.600" }
  );

  const handleGetHistory = async () => {
    setMessages([]);
    const response = await getChatHistory();
    if (response) {
      setMessages([...response]);
    }
    // else {
    //   setChatError(
    //     "Ah Mortal, fret not, an error seems to have found it's way into my system"
    //   );
    // }
  };

  const handleTranslate = async () => {
    setInputOnSubmit(userInput);
    setChatError("");
    const maxCodeLength = model === "gpt-3.5-turbo" ? 700 : 700;

    if (!userInput) {
      setChatError("You must ask a question mortal to receive an answer!");
      return;
    }

    if (userInput.length > maxCodeLength) {
      setChatError(`Enter less than ${maxCodeLength} characters Mortal!.`);
      return;
    }

    setLoading(true);

    try {
      const response = await handleResponse(userInput, version);

      if (response) {
        // Append new message to the existing messages array
        setMessages((prevMessages) => [
          { role: "user", content: userInput },
          { role: "bot", content: response },
          ...prevMessages,
        ]);
        setUserInput("");
      }
    } catch (error) {
      setChatError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (Event) => {
    setUserInput(Event.target.value);
  };

  useEffect(() => {
    user ? handleGetHistory() : registerGuestUser();
  }, []);

  return (
    <ChakraProvider>
      <Header showNav />

      <Box>
        <Sidebar />
        <Box
          // pt={{ base: "60px", md: "30px" }}
          float="right"
          height="100%"
          // overflow="auto"
          position="relative"
          fontFamily="manrope"
          maxHeight="100%"
          w={{ base: "100%", xl: "calc( 100% - 290px )" }}
          maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease">
          <Box
            mx="auto"
            p={{ base: "20px", md: "30px" }}
            pe="20px"
            minH="100vh">
            <Flex w="100%" direction="column" position="relative">
              <Flex
                direction="column"
                mx="auto"
                className={`searchbar__container`}
                w={{ base: "100%", md: "100%", xl: "100%" }}
                minH={{ base: "75vh", "2xl": "85vh" }}
                maxW="1000px">
                {/* Chat Input */}
                {/* Chat Error */}
                <Text
                  align="center"
                  fontSize="15px"
                  color="tomato"
                  marginTop="90px">
                  {chatError}
                </Text>
                <Flex
                  ms={{ base: "0px", xl: "60px" }}
                  mb="50px"
                  position="sticky"
                  // zIndex={"1000"}
                  top="110px"
                  alignItems={"center"}
                  justifySelf={"flex-end"}>
                  <Input
                    minH="54px"
                    h="100%"
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
                    onChange={handleChange}
                  />
                  <Button
                    // py="15px"
                    // px="11px"
                    fontSize="sm"
                    colorScheme="blue"
                    size="md"
                    // backgroundColor="#303030"
                    borderRadius="8px"
                    // ms="auto"
                    color="white"
                    // w={{ base: "160px", md: "110px" }}
                    // h="50px"
                    _hover={{
                      boxShadow:
                        "0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important",
                      bg: "#EB00FF  !important",
                      // _disabled: {
                      //   bg: "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)",
                      // },
                    }}
                    onClick={handleTranslate}
                    isLoading={loading ? true : false}>
                    Submit
                  </Button>
                </Flex>

                {/* response here */}
                {messages.map((message, index) => (
                  <Flex
                    key={index}
                    my={"10px"}
                    position="relative"
                    direction={message.role === "user" ? "col" : "row"}>
                    <Box
                      borderRadius="full"
                      border="1px solid"
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
                      <Icon
                        as={message.role === "user" ? MdPerson : MdAutoAwesome}
                        width="20px"
                        height="20px"
                        color={message.role === "user" ? "brandColor" : "white"}
                        cursor="pointer"
                      />
                    </Box>
                    <Flex
                      p="14px"
                      // borderColor={borderColor}
                      borderRadius="8px"
                      className={"chat__content__container"}
                      w="100%"
                      color={message.role === "user" ? "white" : "white"}>
                      <ReactMarkdown className="font-medium chat__content">
                        {message.content}
                      </ReactMarkdown>
                    </Flex>
                  </Flex>
                ))}
                <Flex
                  justify="center"
                  mt="20px"
                  direction={{ base: "column", md: "row" }}
                  alignItems="center"></Flex>
              </Flex>
            </Flex>
          </Box>
          <Box>{/* <Footer /> */}</Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
