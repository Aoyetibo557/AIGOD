import React, { useState, Suspense, lazy, useEffect } from "react";
import axios from "axios";
import "./styles/App.css";
import { ErrorBoundary } from "react-error-boundary";
import { Routes, Route } from "react-router-dom";
import Fallback from "./pages/error/fallback";
import PrivateRoutes from "./pages/customRoutes/privateRoutes";
import AdminRoutes from "./pages/customRoutes/adminRoutes";
import { verifyToken } from "./utils/auth";
import ResetPasswordForm from "./components/signup/resetpassword";
import NewBlogPost from "./pages/blog/newblog";
import AdminPage from "./pages/admin/admin";
import { generateRandomString } from "./utils/commonfunctions";
import Subscription from "./components/settings/settingssubscription";

const HomePage = lazy(() => import("./pages/homepage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const ComingSoonPage = lazy(() => import("./pages/coming_soon/ComingSoonPage"));
const LoginPage = lazy(() => import("./pages/login/login"));
const SignupPage = lazy(() => import("./pages/signup/signup"));
const ProfilePage = lazy(() => import("./pages/profile/profile"));
const SettingsAccount = lazy(() =>
  import("./components/settings/settingsaccount")
);
const BlogPage = lazy(() => import("./pages/blog/blog"));
const BlogDetail = lazy(() => import("./pages/blog/blogdetail"));
const ForgotPasswordPage = lazy(() =>
  import("./pages/forgot-password/forgotPassword")
);

const Loading = () => {
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

function App() {
  const randomRoute = generateRandomString(10);
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

          <Route
            path="/blogs"
            element={
              <Suspense fallback={<Loading />}>
                <BlogPage />
              </Suspense>
            }
          />

          <Route
            path="/blog/:blogId"
            element={
              <Suspense fallback={<Loading />}>
                <BlogDetail />
              </Suspense>
            }
          />

          {/* These are private routes only available to authenticated users */}
          <Route element={<PrivateRoutes />}>
            <Route
              path="/settings/profile"
              element={
                <Suspense fallback={<Loading />}>
                  <ProfilePage />
                </Suspense>
              }
            />

            <Route
              path="/settings/account"
              element={
                <Suspense fallback={<Loading />}>
                  <SettingsAccount />
                </Suspense>
              }
            />

            <Route
              path="/settings/subscription"
              element={
                <Suspense fallback={<Loading />}>
                  <Subscription />
                </Suspense>
              }
            />

            <Route element={<AdminRoutes />}>
              <Route
                path={`/epikavios/internal-e3gHt7Jp5q/admin`}
                element={
                  <Suspense fallback={<Loading />}>
                    <AdminPage />
                  </Suspense>
                }
              />

              <Route
                path="/create-new-blog"
                element={
                  <Suspense fallback={<Loading />}>
                    <NewBlogPost />
                  </Suspense>
                }
              />
            </Route>
          </Route>

          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<Loading />}>
                <ForgotPasswordPage />
              </Suspense>
            }
          />

          <Route
            path="/reset-password/:token"
            element={
              <Suspense fallback={<Loading />}>
                <ResetPasswordForm />
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
