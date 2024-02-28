import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Searchbar.css";

const Searchbar = ({ onSearch, size, placeholder, clsx }) => {
  const [userInput, setUserInput] = useState("");

  const handleUserInput = (e) => {
    const inputValue = e.target.value;
    setUserInput(inputValue);

    onSearch(inputValue.toLowerCase());
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder={placeholder}
        value={userInput}
        onChange={handleUserInput}
        className={`${clsx || `searchbar_input`} ${
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

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  size: PropTypes.string,
  placeholder: PropTypes.string,
  clsx: PropTypes.string,
};

Searchbar.defaultProps = {
  size: "sm",
  placeholder: "Enter Text Here!",
  clsx: "",
};
