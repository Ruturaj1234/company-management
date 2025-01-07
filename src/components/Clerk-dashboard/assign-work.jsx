import React, { useEffect, useState } from "react";

const AssignWork = () => {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Tech Solutions Inc.",
      projects: [
        { id: 1, name: "Project Alpha" },
        { id: 2, name: "Project Beta" },
      ],
    },
    {
      id: 2,
      name: "Innovatech Ltd.",
      projects: [
        { id: 3, name: "Project Gamma" },
        { id: 4, name: "Project Delta" },
      ],
    },
  ]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [employees, setEmployees] = useState([
    { id: 1, username: "Alice Johnson" },
    { id: 2, username: "Bob Smith" },
    { id: 3, username: "Charlie Davis" },
  ]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [message, setMessage] = useState("");

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setSelectedProject(null); // Reset the selected project when changing company
    setSelectedEmployees([]); // Reset selected employees
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    // Reset selected employees when changing project
    setSelectedEmployees([]);
  };

  const handleAssign = () => {
    const data = {
      projectId: selectedProject.id,
      employeeIds: selectedEmployees,
      message: message,
    };

    console.log("Assigning work with data:", data);
    // Handle assignment logic, e.g., API call to assign project
    alert(`Project "${selectedProject.name}" assigned to selected employees!`);

    // Reset states if needed
    setSelectedCompany(null);
    setSelectedProject(null);
    setSelectedEmployees([]);
    setMessage("");
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h3 className="text-xl font-semibold">Assign Work</h3>

      <div className="mt-4">
        <label className="block mb-2">Select Company:</label>
        {companies.map((company) => (
          <div key={company.id} className="mb-4">
            <h4
              className="font-bold cursor-pointer"
              onClick={() => handleCompanySelect(company)}
            >
              {company.name}
            </h4>
            {selectedCompany && selectedCompany.id === company.id && (
              <div className="ml-4">
                {company.projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => handleProjectSelect(project)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 mb-2"
                  >
                    {project.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="mt-4">
          <h4 className="font-bold">Selected Company: {selectedCompany.name}</h4>
          <h4 className="font-bold">Selected Project: {selectedProject.name}</h4>
          
          <label className="block mb-2">Select Employees:</label>
          {employees.map((employee) => (
            <div key={employee.id}>
              <label>
                <input
                  type="checkbox"
                  value={employee.id}
                  onChange={(e) => {
                    const id = parseInt(e.target.value);
                    setSelectedEmployees((prev) =>
                      e.target.checked
                        ? [...prev, id]
                        : prev.filter((employeeId) => employeeId !== id)
                    );
                  }}
                />
                {employee.username}
              </label>
            </div>
          ))}

          <h4 className="font-bold mt-4">Selected Employees:</h4>
          <ul>
            {selectedEmployees.map((employeeId) => {
              const employee = employees.find((emp) => emp.id === employeeId);
              return employee ? <li key={employeeId}>{employee.username}</li> : null;
            })}
          </ul>

          <label className="block mb-2 mt-4">Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border rounded w-full p-2"
            rows="3"
          />

          <button
            onClick={handleAssign}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Assign Project
          </button>
        </div>
      )}
    </div>
  );
};

export default AssignWork;
