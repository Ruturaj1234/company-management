// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import OwnerDashboard from './components/owner-dashboard/owner-dashboard';
import Login from './components/login/login';
import ClerkDashboard from "./components/Clerk-dashboard/Clerk-dashboard";
import ClientManagement from "./components/Clerk-dashboard/ClientManagement"
import ProjectManagement from "./components/Clerk-dashboard/ProjectManagement"
import ProjectDetail from "./components/Clerk-dashboard/ProjectDetail"
import GenerateQuotation from "./components/Clerk-dashboard/GenerateQuotation";
import GenerateBill from "./components/Clerk-dashboard/GenerateBill";
import Media from "./components/Clerk-dashboard/Media";
import QuotationsList from "./components/Clerk-dashboard/QuotationsList";
import ViewQuotation from "./components/Clerk-dashboard/ViewQuotation";

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
                <Route
          path="/client/:clientId/project/:projectId/generate-quotation"
          element={<GenerateQuotation />}
        />
        <Route
          path="/client/:clientId/project/:projectId/generate-bill"
          element={<GenerateBill />}
        />
        <Route
          path="/client/:clientId/project/:projectId/media"
          element={<Media />} />
<Route path="/quotations" element={<QuotationsList />} />
<Route path="/view-quotation/:id" element={<ViewQuotation />} />



            </Routes>
        </Router>
    );
};

export default App;






