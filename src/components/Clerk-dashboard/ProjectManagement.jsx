// ProjectManagement.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams for routing
import { FaPlus, FaBars, FaSignOutAlt } from "react-icons/fa"; // Import icons for add button, menu, and logout

const ProjectManagement = () => {
  const { clientId } = useParams(); // Get client ID from URL
  const [clients, setClients] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedClients = localStorage.getItem("clients");
    if (storedClients) {
      setClients(JSON.parse(storedClients)); // Load clients from local storage
    }
  }, []);

  const handleAddProject = () => {
    if (projectName.trim()) {
      const updatedClients = [...clients];
      const newProject = { name: projectName, description: projectDescription, createdAt: new Date().toLocaleString() };
      updatedClients[clientId].projects.push(newProject);
      setClients(updatedClients);
      localStorage.setItem("clients", JSON.stringify(updatedClients)); // Save to local storage
      setProjectName("");
      setProjectDescription("");
    }
  };

  const confirmLogout = () => {
    window.location.href = "/login"; // Redirect to login page
  };

  const handleProjectClick = (projectIndex) => {
    navigate(`/projects/${clientId}/${projectIndex}`); // Navigate to the project detail page
  };

  return (
    <div className="flex">
      <div className={`flex-1 p-6 bg-gray-100`}>
        <header className="flex items-center justify-between bg-white p-4 shadow-md">
          <button className="text-gray-700">
            <FaBars size={24} />
          </button>
          <div className="flex items-center flex-grow justify-center">
            <img
              src="https://www.saisamarthpolytech.com/images/logo.png" // Replace with your logo URL
              alt="Sai Samarth Polytech"
              className="h-10 w-auto"
            />
          </div>
          <button onClick={confirmLogout} className="text-gray-700">
            <FaSignOutAlt size={24} />
          </button>
        </header>

        <h2 className="text-2xl font-bold mt-4 mb-4">Projects for Client {clientId}</h2>

        <div className="flex justify-center mb-4">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"
            className="border rounded-lg p-2 w-1/3"
          />
          <input
            type="text"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Project Description"
            className="border rounded-lg p-2 w-1/3 ml-2"
          />
          <button
            onClick={handleAddProject}
            className="bg-orange-600 text-white px-4 py-2 rounded ml-2"
          >
            <FaPlus className="mr-2" />
            Add Project
          </button>
        </div>

        <div className="overflow-y-auto max-h-60">
          {clients[clientId]?.projects?.length > 0 ? (
            clients[clientId].projects.map((project, index) => (
              <div key={index} className="bg-white p-4 mb-2 shadow rounded-lg flex justify-between items-center">
                <div onClick={() => handleProjectClick(index)} style={{ cursor: 'pointer' }}>
                  <span>{project.name}</span>
                  <span className="ml-2 text-sm text-gray-500">{project.createdAt}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-4 mb-2 shadow rounded-lg">
              <span>No projects added yet.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;
