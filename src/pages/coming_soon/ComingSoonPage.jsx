import React from "react";
import Header from "../../components/header/Header";
import Waitlistinput from "../../components/countdown/Waitlistinput";

const ComingSoonPage = () => {
  return (
    <div>
      <Header showNav />
      <div className="comingsoon_page_container">
        <Waitlistinput />
      </div>
    </div>
  );
};

export default ComingSoonPage;
