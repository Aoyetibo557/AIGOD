// useChatbot.js
import { useState } from "react";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const useChatbot = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // register guest user
  const registerGuestUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url + "/api/guest_register/");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
    } catch (error) {
      setError("Something went wrong while registering as a guest user.");
    } finally {
      setLoading(false);
    }
  };

  //send message to chatbot
  const sendMessage = async (userInput, messages, setMessages, version) => {
    if (!userInput.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${url}/api/chat/`,
        {
          query: userInput,
          history: messages,
          version: version,
        },
        {
          headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );
      const aiReply = response.data;
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: userInput, timestamp: aiReply.timestamp },
        {
          role: "assistant",
          content: aiReply.content,
          timestamp: aiReply.timestamp,
        },
      ]);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log("123");
        await registerGuestUser();
      }
    } finally {
      setLoading(false);
    }
  };

  // handle response from chatbot
  const handleResponse = async (inputCode, version) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${url}/api/chat/`,
        {
          query: inputCode,
          history: [],
          version: version,
        },
        {
          headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Something went wrong when fetching from the API.");
      }

      return response.data.content;
    } catch (error) {
      throw new Error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //gethistory
  const getChatHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/chat/`, {
        headers: {
          Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      if (response.status !== 200) {
        throw new Error(
          "Something went wrong when fetching from the UserChat History."
        );
      }

      return response.data;
    } catch (error) {
      setError("Error occured getting user history!");
    } finally {
      setLoading(false);
    }
  };

  return {
    registerGuestUser,
    handleResponse,
    getChatHistory,
    sendMessage,
    loading,
    error,
  };
};
