import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-white shadow-lg w-64 min-h-screen">
            <div className="p-4">
                <h2 className="text-2xl font-bold text-orange-600">Employee Menu</h2>
            </div>
            <nav className="mt-4">
                <ul>
                    <li>
                        <Link to="/employee-dashboard" className="block p-4 text-gray-700 hover:bg-orange-100">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/view-tasks" className="block p-4 text-gray-700 hover:bg-orange-100">
                            View Tasks
                        </Link>
                    </li>
                    <li>
                        <Link to="/submit-reports" className="block p-4 text-gray-700 hover:bg-orange-100">
                            Submit Reports
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings" className="block p-4 text-gray-700 hover:bg-orange-100">
                            Settings
                        </Link>
                    </li>
                    {/* Add more links as needed */}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;


