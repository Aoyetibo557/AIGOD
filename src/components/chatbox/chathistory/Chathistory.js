// ChatHistory.js
import React, { useState } from "react";
import "./Chathistory.css";

/**
 * TODO: Logic for rendering the chat history still need to be done:
 * It'll need to get all the chat history from the database and render it in the UI
 * the chat history will be grouped by date, and each date will have a list of chat logs
 */

const ChatHistory = ({ userChatHistory }) => {
  const [toggle, setToggle] = useState(false);
  const [expandedDate, setExpandedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleDate = (date) => {
    setExpandedDate((prevDate) => (prevDate === date ? null : date));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredHistory = userChatHistory?.filter((chat) =>
    chat.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat_history">
      <div className="view_history" onClick={() => setToggle(!toggle)}>
        {toggle ? <p>Hide history &uarr;</p> : <p>View history &darr;</p>}
      </div>
      {toggle && (
        <>
          <input
            type="text"
            placeholder="Search history..."
            value={searchTerm}
            onChange={handleSearch}
            className="chathistory_search_input"
          />

          {filteredHistory?.map((chat, index) => (
            <div key={index}>
              <div
                className="chat_history_date"
                onClick={() => handleToggleDate(chat.date)}>
                <span>{chat.date}</span>
              </div>
              {expandedDate === chat.date && (
                <div className="chat_history_items">
                  <div className="chathistory_log">
                    <span>{""}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ChatHistory;
