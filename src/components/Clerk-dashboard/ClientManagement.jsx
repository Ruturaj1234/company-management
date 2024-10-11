// ClientManagement.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { FaPlus, FaBars, FaSignOutAlt } from "react-icons/fa"; // Import icons for add button, menu, and logout
import Sidebar from "./Sidebar"; // Import Sidebar

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [clientName, setClientName] = useState("");
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAddClient = () => {
    if (clientName.trim()) {
      const newClient = { name: clientName, createdAt: new Date().toLocaleString(), projects: [] };
      const updatedClients = [...clients, newClient];
      setClients(updatedClients);
      localStorage.setItem("clients", JSON.stringify(updatedClients)); // Save to local storage
      setClientName("");
      setShowAddClientModal(false);
    }
  };

  useEffect(() => {
    const storedClients = localStorage.getItem("clients");
    if (storedClients) {
      setClients(JSON.parse(storedClients)); // Load clients from local storage
    }
  }, []);

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className={`flex-1 p-6 bg-gray-100 ${isSidebarOpen ? "ml-64" : "ml-0"} transition-all`}>
        <header className="flex items-center justify-between bg-white p-4 shadow-md">
          <button onClick={toggleSidebar} className="text-gray-700">
            <FaBars size={24} />
          </button>
          <div className="flex items-center flex-grow justify-center">
            <img
              src="https://www.saisamarthpolytech.com/images/logo.png" // Replace with your logo URL
              alt="Sai Samarth Polytech"
              className="h-10 w-auto"
            />
          </div>
          <button onClick={() => window.location.href = "/login"} className="text-gray-700">
            <FaSignOutAlt size={24} />
          </button>
        </header>

        <div className="flex justify-center mb-4 mt-4">
          <input
            type="text"
            placeholder="Search for clients..."
            className="border rounded-lg p-2 w-1/3"
          />
          <button
            onClick={() => setShowAddClientModal(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded ml-4"
          >
            <FaPlus className="mr-2" />
            Add Client
          </button>
        </div>

        <div className="overflow-y-auto max-h-60">
          {clients.length > 0 ? (
            clients.map((client, index) => (
              <div key={index} className="bg-white p-4 mb-2 shadow rounded-lg flex justify-between items-center">
                <div onClick={() => navigate(`/projects/${index}`)} style={{ cursor: 'pointer' }}>
                  <span>{client.name}</span>
                  <span className="ml-2 text-sm text-gray-500">{client.createdAt}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-4 mb-2 shadow rounded-lg">
              <span>No clients added yet.</span>
            </div>
          )}
        </div>

        {showAddClientModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Add New Client</h2>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Client Name"
                className="border rounded-lg p-2 w-full mb-4"
              />
              <div className="flex justify-between">
                <button
                  onClick={handleAddClient}
                  className="bg-orange-600 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddClientModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientManagement;
