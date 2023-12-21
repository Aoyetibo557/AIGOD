// ChatHistory.js
import React, { useState } from "react";
import "./Chathistory.css";

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
                  {chat.chatLog.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`chat_item user ${item.type}`}>
                      <span>{item.type === "user" ? "User:" : "AI:"}</span>
                      <p>{item.content}</p>
                    </div>
                  ))}
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
