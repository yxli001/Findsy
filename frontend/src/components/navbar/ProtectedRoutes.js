import React from "react";
import { Outlet, Navigate } from "react-router";

export const ProtectedRoutes = (props) => {
    return props.token !== null ? <Outlet /> : <Navigate to="/signup" />;
};
