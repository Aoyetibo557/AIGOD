import React, { Suspense, lazy, useEffect } from "react";
import "./styles/App.css";
import { ErrorBoundary } from "react-error-boundary";
import { Routes, Route } from "react-router-dom";
import Fallback from "./pages/error/fallback";

const HomePage = lazy(() => import("./pages/homepage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const ComingSoonPage = lazy(() => import("./pages/coming_soon/ComingSoonPage"));

const Loading = () => {
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={<Fallback />}
      onReset={() => {
        window.location.reload();
      }}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <ComingSoonPage />
              </Suspense>
            }
          />
          <Route
            path="/chattest"
            element={
              <Suspense fallback={<Loading />}>
                <ChatPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <Fallback />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
