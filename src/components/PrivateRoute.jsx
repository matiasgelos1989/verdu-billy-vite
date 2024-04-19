import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ path, element }) => {
    const { logout } = useAuth();
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
        logout();
        return <Navigate to={'/login'} replace />;
    }
    return <Outlet />;
};

export default PrivateRoute;
