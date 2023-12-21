import React from "react";
import Header from "../components/header/Header";
import Chatbox from "../components/chatbox/Chatbox";
import ChatHistory from "../components/chatbox/chathistory/Chathistory";
import "./homepage.css";
// create a temp chat history to test the UI, the structure of a history is this:
// date(12/12/2021) -> chatLog -> chatLog -> chatLog; a single chat log, could have multiple chat items and a single date could have multiple chat logs
const tempChatHistory = [
  {
    date: "12/12/2021",
    chatLog: [
      { type: "user", content: "Hello" },
      { type: "ai", content: "Hi" },
      { type: "user", content: "How are you?" },
      { type: "ai", content: "I'm fine, thank you. And you?" },
      { type: "user", content: "I'm fine too" },
      { type: "ai", content: "That's good" },
      { type: "user", content: "Bye" },
      { type: "ai", content: "Bye" },
    ],
  },
  {
    date: "12/13/2021",
    chatLog: [
      { type: "user", content: "Hello" },
      { type: "ai", content: "Hi" },
      { type: "user", content: "How are you?" },
      { type: "ai", content: "I'm fine, thank you. And you?" },
      { type: "user", content: "I'm fine too" },
      { type: "ai", content: "That's good" },
      { type: "user", content: "Bye" },
      { type: "ai", content: "Bye" },
    ],
  },
  {
    date: "12/14/2021",
    chatLog: [
      { type: "user", content: "Hello" },
      { type: "ai", content: "Hi" },
      { type: "user", content: "How are you?" },
      { type: "ai", content: "I'm fine, thank you. And you?" },
      { type: "user", content: "I'm fine too" },
      { type: "ai", content: "That's good" },
      { type: "user", content: "Bye" },
      { type: "ai", content: "Bye" },
    ],
  },
];

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="homepage_body">
        <ChatHistory userChatHistory={tempChatHistory} />
        <Chatbox />
      </div>
    </div>
  );
};

export default HomePage;
