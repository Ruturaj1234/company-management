import React from 'react';
import Sidebar from './Sidebar';

const EmployeeDashboard = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-3xl font-bold text-orange-600">Employee Dashboard</h1>
                <div className="mt-4">
                    <p>Welcome to the Employee Dashboard. Here you can manage your tasks and view your assignments.</p>
                    {/* Add more content and functionality specific to the Employee role */}
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;

