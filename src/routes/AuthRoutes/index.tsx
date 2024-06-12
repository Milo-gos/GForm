import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoutes = () => {
    const token = localStorage.getItem('accessToken') || false;
    return !token ? <Outlet /> : <Navigate to="/" />;
};

export default AuthRoutes;
