import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  return localStorage.getItem("access_token_db") ? (
    children
  ) : (
    <Navigate to="/LogInPage" replace />
  );
};

export default ProtectedRoute;
