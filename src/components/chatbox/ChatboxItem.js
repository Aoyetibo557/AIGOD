import React from "react";
import "./Chatbox.css";
import Avatar from "@mui/material/Avatar";
import EyeImage from "../../assets/images/eye.png";

const ChatboxItem = ({ type, content }) => {
  return (
    <div className={`chat_item ${type}`}>
      <div>
        {type === "user" ? (
          <div>
            <Avatar sx={{ width: 24, height: 24, bgcolor: "#eb00ff" }}>
              A
            </Avatar>
          </div>
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
