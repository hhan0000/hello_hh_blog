// src/router/index.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../routes/HomePage.jsx";
import PostListPage from "../routes/PostListPage.jsx";
import LoginPage from "../routes/LoginPage.jsx";
import Register from "../routes/Register.jsx";
import WritePage from "../routes/WritePage.jsx";
import SignlePostPage from "../routes/SignlePostPage.jsx";
import MainLayout from "../layout/MainLayout.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Setting from "../routes/Setting.jsx";
import NotFound from "../routes/NotFound.jsx";
import Message from "./Message.jsx";
import { isLoggedIn } from "../utils/auth.js";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={isLoggedIn() ? "/home" : "/login"} replace />,
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/posts",
        element: (
          <ProtectedRoute>
            <PostListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/write",
        element: (
          <ProtectedRoute>
            <WritePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/settings",
        element: <Setting />,
      },
      {
        path: "/messages",
        element: (
          <ProtectedRoute>
            <Message />
          </ProtectedRoute>
        ),
      },
      {
        path: "/:slug",
        element: (
          <ProtectedRoute>
            <SignlePostPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
