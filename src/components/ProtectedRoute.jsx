// src/components/ProtectedRoute.js

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children, role }) => {
    const [auth, setAuth] = useState({ loading: true, isAuthenticated: false });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost/backend/check_auth.php', { withCredentials: true });
                if (response.data.status === 'success' && response.data.role === role) {
                    setAuth({ loading: false, isAuthenticated: true });
                } else {
                    setAuth({ loading: false, isAuthenticated: false });
                }
            } catch (error) {
                setAuth({ loading: false, isAuthenticated: false });
            }
        };
        checkAuth();
    }, [role]);

    if (auth.loading) return <div>Loading...</div>;
    if (!auth.isAuthenticated) return <Navigate to="/" />;
    return children;
};

export default ProtectedRoute;
