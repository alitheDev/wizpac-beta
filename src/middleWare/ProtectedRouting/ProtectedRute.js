import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Auth from "../Auth/Auth";


const ProtectedRoutes = () => {
  return Auth.isAuthenticated() !== true ? <Navigate to="/login" /> : <Outlet /> ;
};
export default ProtectedRoutes;
