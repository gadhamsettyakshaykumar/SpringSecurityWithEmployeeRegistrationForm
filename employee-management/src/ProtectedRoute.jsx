import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the children (protected component)
  return children;
}

export default ProtectedRoute;
