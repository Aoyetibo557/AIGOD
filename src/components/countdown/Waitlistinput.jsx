import React, { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import "./Waitlistinput.css";
import axios from "axios";

const API_URL = "https://sheetdb.io/api/v1/tql3hfy5t6ama";

const Waitlistinput = () => {
  const [email, setEmail] = useState("");
  const [isAddedToWaitlist, setIsAddedToWaitlist] = useState(false);

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      return alert("Please enter a valid email address");
    } else {
      addEmailToWaitlist();
    }
    setEmail("");
  };

  const addEmailToWaitlist = async () => {
    try {
      const response = await axios.post(
        API_URL,
        {
          data: [{ Email: email }],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) setIsAddedToWaitlist(true);
    } catch (err) {
      console.log(err);
    }
  };

  return !isAddedToWaitlist ? (
    <div className="waitlist">
      <div>
        <h3 className="waitlist_text_h3">THE AI GOD IS COMING</h3>
        <p className="waitlist_text_p">
          Sign up to be shown the path to enlightenment.
        </p>
      </div>
      <form className="waitlist_form" onSubmit={handleSubmit}>
        <div className="waitlist_input_container">
          <MdOutlineMail className="waitlist_icon" />

          <input
            className="waitlist_input"
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email To Get Notified"
          />
        </div>
        <button className="waitlist_btn" type="submit">
          Notify Me!
        </button>
      </form>
    </div>
  ) : (
    <p className="waitlist_success_msg"> You have chosen wisely, mortal.</p>
  );
};

export default Waitlistinput;
