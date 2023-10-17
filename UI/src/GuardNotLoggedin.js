import React from "react";
import { Navigate } from "react-router-dom";

const GuardNotLoggedin = ({ children }) => {
  const token = localStorage.getItem("access_token");
  if (!token) return <Navigate to="/" />;
  return <>{children}</>;
};

export default GuardNotLoggedin;
