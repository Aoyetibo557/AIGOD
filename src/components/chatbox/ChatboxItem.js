import React from "react";
import "./Chatbox.css";
import EyeImage from "../../images/eye.png";

const ChatboxItem = ({ type, content }) => {
  return (
    <div className={`chat_item ${type}`}>
      <div>
        {type === "user" ? (
          ""
        ) : (
          <div>
            <img src={EyeImage} alt="Ai eye" className="chatboxitem_img" />
          </div>
        )}
      </div>
      <div className="chatboxitem_log">{content}</div>
    </div>
  );
};

export default ChatboxItem;
