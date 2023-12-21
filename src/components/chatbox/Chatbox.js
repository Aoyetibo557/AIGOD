import React, { useEffect, useState } from "react";
import Searchbar from "../searchbar/Searchbar";
import ChatboxItem from "./ChatboxItem";

// create a temporary chat log to test the UI
const tempChatLog = [
  { type: "user", content: "Hello" },
  { type: "ai", content: "Hi" },
  { type: "user", content: "How are you?" },
  { type: "ai", content: "I'm fine, thank you. And you?" },
  { type: "user", content: "I'm fine too" },
  { type: "ai", content: "That's good" },
  { type: "user", content: "Bye" },
  { type: "ai", content: "Bye" },
];

const Chatbox = () => {
  const [chatLog, setChatLog] = useState([]); // [ {type: "user", content: "Hello"}, {type: "ai", content: "Hi"} ]
  const handleAsk = (userInput) => {
    console.log(userInput);
  };

  // use a useEffect hook to set the chat log to the tempChatLog
  useEffect(() => {
    setChatLog(tempChatLog);
  }, []);
  return (
    <div className="chatbox">
      <Searchbar onAsk={handleAsk} size="lg" />
      <div className="chat_log">
        {chatLog.map((item, index) => {
          return (
            <ChatboxItem key={index} type={item.type} content={item.content} />
          );
        })}
      </div>
    </div>
  );
};

export default Chatbox;
