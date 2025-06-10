import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

const AuthProvider = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default AuthProvider;
