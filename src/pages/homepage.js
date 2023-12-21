import React from "react";
import Header from "../components/header/Header";
import Chatbox from "../components/chatbox/Chatbox";
import ChatHistory from "../components/chatbox/chathistory/Chathistory";
import "./homepage.css";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="homepage_body">
        <ChatHistory /> {/* Takes a prop called userChatHistory*/}
        <Chatbox />
      </div>
    </div>
  );
};

export default HomePage;
