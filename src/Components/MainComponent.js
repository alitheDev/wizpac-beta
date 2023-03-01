import React from "react";
import Login from "./Routs/Login";
import Dashboard from "./Dashboard";
import ProtectedRoutes from "../middleWare/ProtectedRouting/ProtectedRute";
import { Routes, Route, Navigate } from "react-router-dom";

const MainComponent = () => {
  return (
    <Routes>
      {localStorage.getItem("loggedIn") ? null : (
        <Route path="/login" element={<Login />} />
      )}

      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default MainComponent;
