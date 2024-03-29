import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if(localStorage.getItem('authToken')){
        return children
    }

    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
