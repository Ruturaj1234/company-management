import React, { useState } from 'react';
import Sidebar from './Sidebar';

const OwnerDashboard = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');

    const handleManageClick = () => {
        setIsFormVisible((prev) => !prev); // Toggle visibility
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const userData = { username, password, role };

        try {
            const response = await fetch('http://localhost/path-to-your-backend-script.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData), // Sending user data
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message || 'User created successfully!');
            } else {
                throw new Error('Failed to create user');
            }
        } catch (error) {
            setMessage('An error occurred: ' + error.message);
        }
    };

    return (
        <div className="flex">
            <Sidebar onManageClick={handleManageClick} />
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold text-orange-600">Owner Dashboard</h1>
                <p>Welcome to the Owner Dashboard. Here you can manage your employees and clerks.</p>

                {/* Show the form if it's visible */}
                {isFormVisible && (
                    <div className="mt-4 p-4 bg-orange-200 rounded">
                        <h3 className="text-lg font-bold text-orange-600 mb-2">Generate Credentials</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full mb-2 p-2 rounded"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full mb-2 p-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="block w-full mb-2 p-2 rounded"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition duration-200"
                            >
                                Generate
                            </button>
                        </form>
                        {message && (
                            <p className="mt-4 text-center text-red-500">{message}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OwnerDashboard;
