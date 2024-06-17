import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Avatar,
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
import { SearchBar } from "../../components/chat/searchbar";
import { MessageList } from "../../components/chat/messagelist";
import { useChatbot } from "../../utils/hooks/useChatbot";
import { useUser } from "../../utils/hooks/useUser";
import { useAuth } from "../../utils/hooks/useAuth";
import { useToast } from "@chakra-ui/react";

export default function ChatPage() {
  const {
    sendMessage,
    handleResponse,
    registerGuestUser,
    getChatHistory,
    loading: hookLoading,
    error,
  } = useChatbot();

  const { username } = useAuth();
  const { profile } = useUser(username || "");
  const url = process.env.REACT_APP_API_URL;

  const [inputOnSubmit, setInputOnSubmit] = useState("");
  const [version, setVersion] = useState("hybrid");
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "",
    },
  ]);

  const toast = useToast();

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
      return toast({
        title: "Error Occurred",
        description: "You must ask a question mortal to receive an answer!",
        duration: 6000,
        isClosable: true,
        position: "top-right",
        status: "error",
      });
    }

    if (userInput.length > maxCodeLength) {
      setChatError(`Enter less than ${maxCodeLength} characters Mortal!.`);
      return toast({
        title: "Error Occurred",
        description: `Enter less than ${maxCodeLength} characters Mortal!.`,
        duration: 6000,
        isClosable: true,
        position: "top-right",
        status: "error",
      });
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
      setUserInput("");
      setLoading(false);
    }
  };

  const handleChange = (Event) => {
    setUserInput(Event.target.value);
  };

  useEffect(() => {
    user ? handleGetHistory() : registerGuestUser();
  }, []);

  const renderAvatar = () => {
    return username && profile ? (
      <Avatar name={profile?.fullname} src={profile?.profile_image} />
    ) : (
      MdPerson
    );
  };

  return (
    <ChakraProvider>
      <Header showNav />

      <Box>
        {/* <Sidebar /> */}
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
                className="searchbar__container"
                w={{ base: "100%", md: "100%", xl: "100%" }}
                minH={{ base: "75vh", "2xl": "85vh" }}
                maxW="1000px">
                <SearchBar
                  userInput={userInput}
                  handleChange={handleChange}
                  handleTranslate={handleTranslate}
                  loading={loading}
                  chatError={chatError}
                />

                <MessageList
                  messages={messages}
                  username={username}
                  profile={profile}
                />
              </Flex>
            </Flex>
          </Box>
          <Box>{/* <Footer /> */}</Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
