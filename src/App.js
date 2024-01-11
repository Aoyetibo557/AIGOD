import "./styles/App.css";
import React from "react";
import HomePage from "./pages/homepage";
import ComingSoonPage from "./pages/coming_soon/ComingSoonPage";
import ChatPage from "./pages/ChatPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ComingSoonPage />} />
        <Route path="/chattest" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
