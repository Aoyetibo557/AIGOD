import React from "react";
import Header from "../../components/header/Header";
import Countdown from "../../components/countdown/Countdown";
import Waitlistinput from "../../components/countdown/Waitlistinput";
import { Box, Text } from "@chakra-ui/react";

const ComingSoonPage = () => {
  return (
    <div>
      <Header />
      <div className="comingsoon_page_container">
        <Waitlistinput />
      </div>
    </div>
  );
};

export default ComingSoonPage;
