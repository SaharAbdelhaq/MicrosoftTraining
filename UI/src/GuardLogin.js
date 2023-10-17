import React from "react";
import { Navigate } from "react-router-dom";

const GuardLogin = ({ children }) => {
  const token = localStorage.getItem("access_token");
  if (token) return <Navigate to="/Home" />;
  return <>{children}</>;
};

export default GuardLogin;
