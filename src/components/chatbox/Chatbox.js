import React, { useState } from "react";
import Searchbar from "../searchbar/Searchbar";
import ChatboxItem from "./ChatboxItem";

/**
 * TODO: Logic for rendering the chatbox still need to be done: the AI chatbox will be connected.
 */

const Chatbox = () => {
  const [chatLog, setChatLog] = useState([]); // [ {type: "user", content: "Hello"}, {type: "ai", content: "Hi"} ]
  const handleAsk = (userInput) => {};

  return (
    <div className="chatbox">
      <Searchbar onAsk={handleAsk} size="lg" />
      <div className="chat_log">
        {chatLog?.map((item, index) => {
          return (
            <ChatboxItem key={index} type={item.type} content={item.content} />
          );
        })}
      </div>
    </div>
  );
};

export default Chatbox;
