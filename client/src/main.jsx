import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "@ant-design/v5-patch-for-react-19";
import { Provider } from "react-redux";
import { store, persistor } from "./store/index.js";
import { PersistGate } from "redux-persist/integration/react";
import { message } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRouter.jsx"; // 👈 引入抽离后的路由配置

import "./index.css";
import "antd/dist/reset.css";

message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
