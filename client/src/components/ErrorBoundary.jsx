// src/components/ErrorBoundary.jsx
import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <h1>页面渲染异常，请刷新或联系支持</h1>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>重试</button>
    </div>
  );
};

const ErrorBoundary = ({ children }) => {
  const handleReset = () => {
    // 可选：执行重置状态的操作，如重新加载数据等
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={handleReset}
      onError={(error, info) => {
        console.error("路由渲染错误:", error, info);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
