import React, { useState, Suspense, lazy, useEffect } from "react";
import axios from "axios";
import "./styles/App.css";
import { ErrorBoundary } from "react-error-boundary";
import { Routes, Route } from "react-router-dom";
import Fallback from "./pages/error/fallback";
import PrivateRoutes from "./components/privateRoutes/privateRoutes";
import { verifyToken } from "./utils/auth";
const HomePage = lazy(() => import("./pages/homepage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const ComingSoonPage = lazy(() => import("./pages/coming_soon/ComingSoonPage"));
const LoginPage = lazy(() => import("./pages/login/login"));
const SignupPage = lazy(() => import("./pages/signup/signup"));
const ProfilePage = lazy(() => import("./pages/profile/profile"));

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
            path="/login"
            element={
              <Suspense fallback={<Loading />}>
                <LoginPage />
              </Suspense>
            }
          />

          <Route
            path="/signup"
            element={
              <Suspense fallback={<Loading />}>
                <SignupPage />
              </Suspense>
            }
          />

          <Route element={<PrivateRoutes />}>
            <Route
              path="/profile"
              element={
                <Suspense fallback={<Loading />}>
                  <ProfilePage />
                </Suspense>
              }
            />
          </Route>

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
