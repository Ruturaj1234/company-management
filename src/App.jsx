// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import OwnerDashboard from './components/owner-dashboard/owner-dashboard';
import Login from './components/login/login';
import ClerkDashboard from "./components/Clerk-dashboard/Clerk-dashboard";
import ClientManagement from "./components/Clerk-dashboard/ClientManagement"
import ProjectManagement from "./components/Clerk-dashboard/ProjectManagement"
import ProjectDetail from "./components/Clerk-dashboard/ProjectDetail"
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect root to /login */}
                <Route path="/login" element={<Login />} />
                <Route path="/owner-dashboard" element={<OwnerDashboard />} />
                <Route path="/clerk-dashboard" element={<ClerkDashboard />} />
                {/* Add more routes as needed */}
            
                <Route path="/client-management" element={<ClientManagement/>} />
                <Route path="/projects/:clientId" element={<ProjectManagement />} />
                <Route path="/projects/:clientId/:projectId" element={<ProjectDetail />} />
            </Routes>
        </Router>
    );
};

export default App;





