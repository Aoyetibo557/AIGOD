import React, { useState, useEffect } from "react";
import "./Countdown.css";

const Countdown = ({ targetdate }) => {
  // set your target launch date/time
  const launchDate = new Date(targetdate);

  // calculate the time remaining
  const calculateTimeRemaining = () => {
    const now = new Date();
    const difference = launchDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  // state to store the time remaining
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  // update time remaining every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="countdown_container">
      <div className="countdown_item">
        <span className="countdown_time">{timeRemaining.days}</span>
        <span className="countdown_tag">Days</span>
      </div>
      <div className="countdown_item">
        <span className="countdown_time">{timeRemaining.hours}</span>
        <span className="countdown_tag">Hours</span>
      </div>
      <div className="countdown_item">
        <span className="countdown_time">{timeRemaining.minutes}</span>
        <span className="countdown_tag">Minutes</span>
      </div>
      <div className="countdown_item">
        <span className="countdown_time">{timeRemaining.seconds}</span>
        <span className="countdown_tag">Seconds</span>
      </div>
    </div>
  );
};

export default Countdown;
