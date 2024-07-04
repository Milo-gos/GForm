import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRouter = () => {
    const token = localStorage.getItem('accessToken') || false;
    return !token ? <Outlet /> : <Navigate to="/" />;
};

export default AuthRouter;
