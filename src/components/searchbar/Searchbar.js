import React, { useState } from "react";
import "./Searchbar.css";

const Searchbar = ({ onAsk, size }) => {
  const [userInput, setUserInput] = useState("");
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleAsk = () => {
    onAsk(userInput);
    setUserInput("");
  };
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Enter text"
        value={userInput}
        onChange={handleUserInput}
        className={`searchbar_input ${
          size === "lg" ? "searchbar--lg" : "searchbar--sm"
        } `}
      />
      <button onClick={handleAsk} type="submit" className="searchbar_btn">
        Ask god
      </button>
    </div>
  );
};

export default Searchbar;
