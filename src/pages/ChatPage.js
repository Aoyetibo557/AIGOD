import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import axios from "axios";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Icon,
  Img,
  Input,
  Link,
  Text,
  useColorModeValue,
  ChakraProvider,
  Spacer,
  Portal,
} from "@chakra-ui/react";
// import Bg from './bg-image';
// import MessageBoxChat from './MessageBox';
import ReactMarkdown from "react-markdown";

import { MdAutoAwesome, MdBolt, MdEdit, MdPerson } from "react-icons/md";

// import theme from './theme';
// import Footer from './FooterAdmin';
// import Navbar from './NavbarAdmin';
import Sidebar from "../components/sidebar/Sidebar";
import "../styles/App.css";
import "../styles/Contact.css";
import "../styles/Plugins.css";
import "../styles/MiniCalendar.css";
import Header from "../components/header/Header";

export default function ChatPage() {
  const [maximized, setMaximized] = useState(false);
  const [version, setVersion] = useState("hybrid");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const url = process.env.REACT_APP_API_URL;
  const public_path = process.env.REACT_APP_PUBLIC_URL;

  const [initMsg, setInitMsg] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "",
    },
  ]);
  const toggleMaximize = () => {
    setMaximized(!maximized);
  };
  const [chatMsg, setChatMsg] = useState([]);
  const [webUrl, setWebUrls] = useState("");

  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState(false);
  const [maxWidth, setMaxWidth] = useState(false);
  const [activeDrags, setActiveDrags] = useState(0);
  const [deltaPosition, setDeltaPosition] = useState({
    x: 0,
    y: 0,
  });
  const [controlledPosition, setControlledPosition] = useState({
    x: -400,
    y: 200,
  });

  useEffect(() => {
    user ? getHistory() : register();
  }, []);

  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  };

  const onStart = () => {
    setActiveDrags((prevActiveDrags) => prevActiveDrags + 1);
  };

  const onStop = () => {
    setActiveDrags((prevActiveDrags) => prevActiveDrags - 1);
  };

  const onDrop = (e) => {
    setActiveDrags((prevActiveDrags) => prevActiveDrags - 1);
    if (e.target.classList.contains("drop-target")) {
      alert("Dropped!");
      e.target.classList.remove("hovered");
    }
  };

  const onDropAreaMouseEnter = (e) => {
    if (activeDrags) {
      e.target.classList.add("hovered");
    }
  };

  const onDropAreaMouseLeave = (e) => {
    e.target.classList.remove("hovered");
  };

  const adjustXPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = controlledPosition;
    setControlledPosition({ x: x - 10, y });
  };

  const adjustYPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = controlledPosition;
    setControlledPosition({ x, y: y - 10 });
  };

  const register = () => {
    axios
      .get(url + "/api/guest_register/")
      .then((response) => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
      })
      .catch((error) => {
        alert("Something went wrong. While register as guest user.");
      });
  };

  const getHistory = () => {
    axios
      .get(`${url}/api/chat/`, {
        headers: {
          Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((response) => {
        // response.data.forEach((message) => {
        //   setMessages((prevItems) => [...prevItems, message]);
        // });
        const newChatMsg = response.data.map((item) => {
          let data = {
            message: item.content,
            sentTime: item.timestamp,
            sender: item.role,
          };
          return data;
        });
        setChatMsg([...newChatMsg]);

        setMessages([...response.data]);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          register();
        }
      });
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    setMessages([
      ...messages,
      { role: "user", content: userInput, timestamp: moment().format() },
    ]);
    setUserInput("");
    setLoading(true);
    setMessages((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.push({ role: "assistant", content: "loading" });
      return updatedItems;
    });
    try {
      const response = await axios.post(
        `${url}/api/chat/`,
        {
          query: userInput, // Or use the latest version if available
          history: [],
          version: version,
        },
        {
          headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );
      const aiReply = response.data;
      setMessages((prevItems) => {
        const updatedMessages = [...prevItems];
        return updatedMessages.map((msg) => {
          if (msg.role === "assistant" && msg.content === "loading") {
            msg.content = initMsg;
            return {
              role: "assistant",
              content: aiReply.content,
              timestamp: aiReply.timestamp,
            };
          }
          return msg;
        });
      });
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log("123");
        register();
      }
      // if(error.response.status){}
      setLoading(false);
    }
  };

  const setChats = () => {
    setChat(!chat);
  };

  const maxChatWidth = () => {
    setMaxWidth(!maxWidth);
    const div = document.getElementById("resizableDiv");
    if (div.style.width === "calc(100% - 140px)") {
      div.style.width = "375px";
    } else {
      div.style.width = "calc(100% - 140px)";
    }
  };
  const chatBoxStyles = {
    height: maximized ? "auto" : "69vh",
    overflow: maximized ? "visible" : "hidden",
  };

  const dragHandlers = { onStart, onStop };

  const { apiKeyApp } = {};
  // Input States
  const [inputOnSubmit, setInputOnSubmit] = useState("");
  const [inputCode, setInputCode] = useState("");
  // Response message
  const [outputCode, setOutputCode] = useState("");
  // ChatGPT model
  const [model, setModel] = useState("gpt-3.5-turbo");
  // Loading state
  // const [loading, setLoading] = useState(false);

  // API Key
  // const [apiKey, setApiKey] = useState<string>(apiKeyApp);
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
  const handleTranslate = async () => {
    // const apiKey = apiKeyApp;
    setInputOnSubmit(inputCode);

    // Chat post conditions(maximum number of characters, valid message etc.)
    const maxCodeLength = model === "gpt-3.5-turbo" ? 700 : 700;

    // if (!apiKeyApp?.includes('sk-') && !apiKey?.includes('sk-')) {
    //   alert('Please enter an API key.');
    //   return;
    // }

    if (!inputCode) {
      alert("Please enter your message.");
      return;
    }

    if (inputCode.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.`
      );
      return;
    }
    setOutputCode(" ");
    setLoading(true);
    const controller = new AbortController();

    // -------------- Fetch --------------
    // const response = await fetch("http://127.0.0.1:8000/api/chats/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   signal: controller.signal,
    //   body: JSON.stringify(body),
    // });
    const response = await axios.post(
      `${url}/api/chat/`,
      {
        query: inputCode, // Or use the latest version if available
        history: [],
        version: version,
      },
      {
        headers: {
          Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );

    if (response.status !== 200) {
      setLoading(false);
      if (response) {
        alert(
          "Something went wrong went fetching from the API. Make sure to use a valid API key."
        );
      }
      return;
    }

    const data = response.data;

    if (!data) {
      setLoading(false);
      alert("Something went wrong");
      return;
    }

    // const reader = data.getReader();
    // const decoder = new TextDecoder();
    // let done = false;

    const aiReply = response.data;
    console.log(aiReply.content);
    setLoading(true);

    setOutputCode((prevCode) => prevCode + aiReply.content);
    setLoading(false);

    // while (!done) {
    //   setLoading(true);
    //   const { value, done: doneReading } = await reader.read();
    //   done = doneReading;
    //   const chunkValue = decoder.decode(value);
    //   setOutputCode((prevCode) => prevCode + chunkValue);
    // }

    // setLoading(false);
  };

  const handleChange = (Event) => {
    setInputCode(Event.target.value);
  };

  return (
    <ChakraProvider>
      <Header showNav />
      <Box>
        <Sidebar />
        <Box
          pt={{ base: "60px", md: "30px" }}
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
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
            minH="100vh"
            className="flex"
            pt={{ base: "0px", md: "0px" }}>
            <Flex
              w="100%"
              pt={{ base: "70px", md: "0px" }}
              direction="column"
              position="relative">
              <Flex
                direction="column"
                mx="auto"
                w={{ base: "100%", md: "100%", xl: "100%" }}
                minH={{ base: "75vh", "2xl": "85vh" }}
                maxW="1000px">
                {/* Chat Input */}
                <Flex
                  ms={{ base: "0px", xl: "60px" }}
                  mt="20px"
                  mb="20px"
                  position="sticky"
                  top="140px"
                  justifySelf={"flex-end"}>
                  <Input
                    minH="54px"
                    h="100%"
                    border="1px solid"
                    borderColor={borderColor}
                    borderRadius="45px"
                    p="10px 20px"
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
                    variant="primary"
                    py="15px"
                    px="16px"
                    fontSize="sm"
                    backgroundColor="#303030"
                    borderRadius="10px"
                    ms="auto"
                    color="white"
                    w={{ base: "160px", md: "210px" }}
                    h="54px"
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

                <Flex
                  direction="column"
                  w="100%"
                  mx="auto"
                  position="relative"
                  top={outputCode ? "80px" : "0px"}
                  display={outputCode ? "flex" : "none"}
                  my={"auto"}>
                  <Flex w="100%" align={"center"} mb="10px">
                    <Flex
                      borderRadius="full"
                      justify="center"
                      align="center"
                      bg={"transparent"}
                      border="1px solid"
                      borderColor={borderColor}
                      me="20px"
                      h="40px"
                      minH="40px"
                      minW="40px">
                      <Icon
                        as={MdPerson}
                        width="20px"
                        height="20px"
                        color={brandColor}
                      />
                    </Flex>
                    <Flex
                      p="22px"
                      border="none"
                      borderColor={borderColor}
                      borderRadius="14px"
                      background="#161616"
                      w="100%"
                      color="white"
                      zIndex={"2"}>
                      <Text
                        color={textColor}
                        fontWeight="600"
                        fontSize={{ base: "sm", md: "md" }}
                        lineHeight={{ base: "24px", md: "26px" }}>
                        {inputOnSubmit}
                      </Text>
                      <Icon
                        cursor="pointer"
                        as={MdEdit}
                        ms="auto"
                        width="20px"
                        height="20px"
                        color={gray}
                      />
                    </Flex>
                  </Flex>

                  <Flex w="100%">
                    <Flex
                      borderRadius="full"
                      justify="center"
                      align=""
                      bg={
                        "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)"
                      }
                      me="20px"
                      h="40px"
                      minH="40px"
                      minW="40px">
                      <Icon
                        as={MdAutoAwesome}
                        width="20px"
                        height="20px"
                        color="white"
                      />
                    </Flex>

                    <Flex
                      p="22px"
                      border="none"
                      borderColor={borderColor}
                      borderRadius="14px"
                      background="#161616"
                      w="100%"
                      color="white"
                      zIndex={"2"}>
                      <ReactMarkdown
                        className="font-medium"
                        background="#161616"
                        color="white">
                        {outputCode ? outputCode : ""}
                      </ReactMarkdown>
                    </Flex>
                  </Flex>
                </Flex>

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

// <div className={`fabs`}>
//   <Draggable>
//     <div className={chat ? 'chat is-visible ${maximized ? "maximized" : ""}' : 'chat'} id="resizableDiv" style={chatBoxStyles}>

//       <MainContainer>
//         <ChatContainer>
//           <ConversationHeader username="Kai" info="Available">
//             {/* <ConversationHeader.Back onClick={setChats} /> */}
//             <Avatar
//               src={`/images/bot.png`}
//               name="HelpieBot"
//               status="available"
//             />
//             <ConversationHeader.Content userName="HelpieBot" />

//             <ConversationHeader.Actions>
//             {/* <IconButton onClick={toggleMaximize}>
//                 {maximized ? <MinimizeIcon /> : <CropSquareIcon />}
//               </IconButton> */}
//               {/* Add a new IconButton for Minimize */}
//               {/* <IconButton onClick={toggleMinimize}>
//                 <MinimizeIcon />
//               </IconButton> */}
//               {/* <PowerSettingsNewIcon  onClick={setChats}/> */}
//               {/* <Button
//                 color="inherit"
//                 onClick={setChats}
//                 startIcon={<PowerSettingsNewIcon />}
//               ></Button> */}
//               {/* <span onClick={toggleMaximize}>123</span>
//               <span onClick={toggleMaximize}>123</span> */}
//               <Avatar
//               onClick={maxChatWidth}
//               name="HelpieBot"
//               className={'maximize-avatar'}
//               >
//                 {!maxWidth ? (
//                   <img src="/images/maximize-icon.png" className={'avatar-image'} />
//                 ) : (
//                   <img src="/images/minimize-icon.png" className={'avatar-image'} />
//                 )}
//               </Avatar>
//               <Avatar
//               onClick={toggleMaximize}
//               name="HelpieBot"
//               className={'maximize-avatar'}
//               >
//                 <img src="/images/minimize.png" className={'avatar-image'} />
//               </Avatar>
//             </ConversationHeader.Actions>
//           </ConversationHeader>
//               {(!maximized &&
//           <MessageList
//             loading={false}
//             typingIndicator={
//               loading ? <TypingIndicator content="Helpie Bot is Typing" /> : ''
//             }
//           >
//             {messages
//               .filter((x) => x.role != 'system')
//               .map((message, index) => (
//                 <div key={index}>
//                   {message.role !== 'user' ? (
//                     <Message
//                       model={{
//                         message: message.content,
//                         sender: message.role,
//                         direction: 'incoming',
//                       }}
//                     >
//                       {/* <Avatar src={`${public_path}/images/bot.png`} name={'HelpieBot'} /> */}
//                       <Message.CustomContent>
//                         <Linkify
//                           componentDecorator={(decoratedHref, decoratedText, key) => (
//                             <a target="blank" rel="noopener" href={decoratedHref} key={key}>
//                               {decoratedText}
//                             </a>
//                           )}
//                         >
//                           {message.content}
//                         </Linkify>
//                       </Message.CustomContent>
//                       <Message.Footer
//                         // sender="HelpieBot"
//                         sentTime={moment(message.timestamp).format('h:mm:ss a')}
//                       />
//                     </Message>
//                   ) : (
//                     <Message
//                       model={{
//                         message: message.content,
//                         sender: message.role,
//                         direction: 'outgoing',
//                         sentTime: moment(message.timestamp).format('h:mm:ss a'),
//                       }}
//                     >
//                       <Message.Footer sentTime={moment(message.timestamp).format('h:mm:ss a')} />
//                     </Message>
//                   )}
//                 </div>
//               ))}
//           </MessageList>
//           )}
//           {(!maximized &&
//           <MessageInput
//             attachButton={false}
//             value={userInput}
//             onChange={setUserInput}
//             onSend={sendMessage}
//             id="chatSend"
//             name="chat_message"
//             placeholder="Send a message"
//           />
//           )}
//         </ChatContainer>
//       </MainContainer>

//     </div>
//     </Draggable>
//     <a
//       id="prime"
//       className={chat ? 'fab is-float is-visible chat-icon' : 'fab chat-icon'}
//       onClick={setChats}
//     >
//       {!chat ? (
//         <Avatar
//           src={`/images/bot.png`}
//           name="HelpieBot"
//           status="available"
//         />
//       ) : (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth="1.5"
//           stroke="currentColor"
//           className="w-6 h-6"
//           style={{ width: '32px' }}
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//         </svg>
//       )}
//     </a>

//   </div>
