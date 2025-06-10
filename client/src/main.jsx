import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomePage from "./routes/HomePage.jsx";
import PostListPage from "./routes/PostListPage.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import Register from "./routes/Register.jsx";
import WritePage from "./routes/WritePage.jsx";
import SignlePostPage from "./routes/SignlePostPage.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import AuthProvider from "./components/AuthProvider.jsx";
import { isLoggedIn } from "./utils/auth";
// 重新定义路由
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: isLoggedIn() ? (
          <Navigate to="/home" replace />
        ) : (
          <Navigate to="/login" replace />
        ),
      },

      {
        path: "/home",
        element: (
          <AuthProvider>
            <HomePage />
          </AuthProvider>
        ),
      },
      {
        path: "/posts",
        element: (
          <AuthProvider>
            <PostListPage />
          </AuthProvider>
        ),
      },
      {
        path: "/write",
        element: (
          <AuthProvider>
            <WritePage />
          </AuthProvider>
        ),
      },
      {
        path: "/:slug",
        element: (
          <AuthProvider>
            <SignlePostPage />
          </AuthProvider>
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
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />

    {/* <App /> */}
  </StrictMode>
);
