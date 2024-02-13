import React, { useState } from "react";
import "./Searchbar.css";

const Searchbar = ({ onSearch, size }) => {
  const [userInput, setUserInput] = useState("");

  const handleUserInput = (e) => {
    const inputValue = e.target.value;
    setUserInput(inputValue);

    onSearch(inputValue);
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
      {/* <button type="submit" className="searchbar_btn">
        Search
      </button> */}
    </div>
  );
};

export default Searchbar;
