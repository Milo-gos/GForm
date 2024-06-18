import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const token = localStorage.getItem('accessToken') || false;
    return token ? <Outlet /> : <Navigate to="/signIn" replace={true} />;
};

export default ProtectedRoutes;
