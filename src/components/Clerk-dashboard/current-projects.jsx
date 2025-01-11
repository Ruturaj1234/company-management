import React, { useState, useEffect } from "react";

const CurrentProjects = () => {
  const [currentStep, setCurrentStep] = useState("companyList");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const companies = [
    { id: 1, name: "Company Alpha", projects: ["Project A", "Project B"] },
    { id: 2, name: "Company Beta", projects: ["Project C"] },
    { id: 3, name: "Company Gamma", projects: ["Project D", "Project E"] },
  ];

  const employees = [
    { id: 1, name: "Employee 1" },
    { id: 2, name: "Employee 2" },
    { id: 3, name: "Employee 3" },
  ];

  const [projectLeader, setProjectLeader] = useState(null);
  const [allocatedEmployees, setAllocatedEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState("");

  // Prepopulate project leader and allocated employees for selected project
  useEffect(() => {
    if (currentStep === "allocateEmployees" && selectedProject) {
      setProjectLeader(1); // Default project leader (Employee 1)
      setAllocatedEmployees([2, 3]); // Default allocated employees (Employee 2, 3)
    }
  }, [currentStep, selectedProject]);

  const handleAllocateEmployee = () => {
    if (newEmployee && !allocatedEmployees.includes(Number(newEmployee))) {
      setAllocatedEmployees([...allocatedEmployees, Number(newEmployee)]);
      setNewEmployee(""); // Clear the selection after adding
    }
  };

  const handleRemoveEmployee = (employeeId) => {
    setAllocatedEmployees(allocatedEmployees.filter((id) => id !== employeeId));
  };

  const handleSave = () => {
    alert(
      `Project Leader: ${employees.find(
        (e) => e.id === Number(projectLeader)
      )?.name}\nAllocated Employees: ${allocatedEmployees
        .map((id) => employees.find((e) => e.id === id)?.name)
        .join(", ")}`
    );
    setCurrentStep("companyList");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      {currentStep === "companyList" && (
        <>
          <h3 className="text-xl font-semibold">Companies</h3>
          <ul className="list-disc pl-5 mt-2">
            {companies.map((company) => (
              <li
                key={company.id}
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => {
                  setSelectedCompany(company);
                  setCurrentStep("projectList");
                }}
              >
                {company.name}
              </li>
            ))}
          </ul>
        </>
      )}

      {currentStep === "projectList" && selectedCompany && (
        <>
          <button
            className="bg-gray-300 px-4 py-2 rounded mb-4"
            onClick={() => setCurrentStep("companyList")}
          >
            Back
          </button>
          <h3 className="text-xl font-semibold">
            Projects for {selectedCompany.name}
          </h3>
          <ul className="list-disc pl-5 mt-2">
            {selectedCompany.projects.map((project, index) => (
              <li
                key={index}
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentStep("allocateEmployees");
                }}
              >
                {project}
              </li>
            ))}
          </ul>
        </>
      )}

      {currentStep === "allocateEmployees" && selectedProject && (
        <>
          <button
            className="bg-gray-300 px-4 py-2 rounded mb-4"
            onClick={() => setCurrentStep("projectList")}
          >
            Back
          </button>
          <h3 className="text-xl font-semibold">
            Allocate Employees for {selectedProject}
          </h3>

          <div className="mt-4">
            <h4 className="text-lg font-semibold">Allocated Employees</h4>
            <ul className="list-disc pl-5 mt-2">
              {allocatedEmployees.map((id) => (
                <li key={id} className="flex items-center">
                  <span className="flex-1">{employees.find((e) => e.id === id)?.name}</span>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleRemoveEmployee(id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h4 className="text-lg font-semibold">Current Project Leader</h4>
            <span className="block mb-2">
              {employees.find((e) => e.id === Number(projectLeader))?.name}
            </span>
            <h4 className="text-lg font-semibold">Select New Project Leader</h4>
            <select
              className="border p-2 rounded w-full"
              value={projectLeader}
              onChange={(e) => setProjectLeader(e.target.value)}
            >
              <option value="">Select Project Leader</option>
              {allocatedEmployees.map((id) => (
                <option key={id} value={id}>
                  {employees.find((e) => e.id === id)?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <h4 className="text-lg font-semibold">Add Employees</h4>
            <select
              className="border p-2 rounded w-full"
              value={newEmployee}
              onChange={(e) => setNewEmployee(e.target.value)}
            >
              <option value="">Select Employee</option>
              {employees
                .filter((employee) => !allocatedEmployees.includes(employee.id))
                .map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
            </select>
            <button
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleAllocateEmployee}
            >
              Add Employee
            </button>
          </div>

          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default CurrentProjects;
