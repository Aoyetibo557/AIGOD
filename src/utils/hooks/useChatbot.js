// useChatbot.js
import { useState } from "react";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const useChatbot = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Date.parse(expiresAt): Converts the expiresAt string into the number of milliseconds since January 1, 1970, 00:00:00 UTC.
    tokenLifetime: Represents 24 hours in milliseconds.
    expiryTimestamp + tokenLifetime: Calculates the adjusted expiration timestamp by adding 24 hours to the original expiration time.
    currentTimestamp >= adjustedExpiryTimestamp: Checks if the current time is greater than or equal to the adjusted expiration timestamp.
   */
  const isTokenExpired = (expiresAt) => {
    const expiryTimestamp = Date.parse(expiresAt);
    const currentTimestamp = Date.now();
    const tokenLifetime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const adjustedExpiryTimestamp = expiryTimestamp + tokenLifetime;
    return currentTimestamp >= adjustedExpiryTimestamp;
  };
  // register guest user
  const registerGuestUser = async () => {
    setLoading(true);
    sessionStorage.clear();
    try {
      const response = await axios.get(url + "/api/guest_register/");
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      sessionStorage.setItem("token", JSON.stringify(response.data.token));
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
      const token = JSON.parse(sessionStorage.getItem("token"));
      if (!token || isTokenExpired(token.expires_at)) {
        await registerGuestUser();
      }

      const response = await axios.post(
        `${url}/api/chat/`,
        {
          query: userInput,
          history: messages,
          version: version,
        },
        {
          headers: {
            Authorization: `Token ${JSON.parse(
              sessionStorage.getItem("token")
            )}`,
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
      const token = JSON.parse(sessionStorage.getItem("token"));
      const user = JSON.parse(sessionStorage.getItem("user"));

      if (token && isTokenExpired(user.expires_at)) {
        await registerGuestUser();
      }

      const response = await axios.post(
        `${url}/api/chat/`,
        {
          query: inputCode,
          history: [],
          version: version,
        },
        {
          headers: {
            Authorization: `Token ${JSON.parse(
              sessionStorage.getItem("token")
            )}`,
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
      const user = JSON.parse(sessionStorage.getItem("user"));

      if (isTokenExpired(user.expires_at)) {
        await registerGuestUser();
      }

      const response = await axios.get(`${url}/api/chat/`, {
        headers: {
          Authorization: `Token ${JSON.parse(sessionStorage.getItem("token"))}`,
        },
      });

      if (response.status !== 200) {
        throw new Error(
          "Something went wrong when fetching from the UserChat History."
        );
      }

      return response.data;
    } catch (error) {
      setError("Error occurred getting user history!");
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
