import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routes/HomePage.jsx";
import PostListPage from "./routes/PostListPage.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import Register from "./routes/Register.jsx";
import WritePage from "./routes/WritePage.jsx";
import SignlePostPage from "./routes/SignlePostPage.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { zhCN } from "@clerk/localizations";
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/posts",
        element: <PostListPage />,
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
        path: "/:slug",
        element: <SignlePostPage />,
      },

      {
        path: "/write",
        element: <WritePage />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} localization={zhCN}>
      <RouterProvider router={router} />
    </ClerkProvider>
    {/* <App /> */}
  </StrictMode>
);
