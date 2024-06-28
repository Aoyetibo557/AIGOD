import React from "react";
import { useTypewriter } from "../../utils/hooks/useTypeWriter";

export const Typewriter = ({ text, speed }) => {
  const displayText = useTypewriter(text, speed);

  return <p>{displayText}</p>;
};
