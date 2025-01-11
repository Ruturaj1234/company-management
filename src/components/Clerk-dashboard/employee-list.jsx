// EmployeeList.js
import React, { useState } from "react";

const EmployeeList = ({ employees, selectedEmployee, setSelectedEmployee }) => {
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchEmployeeDetails = (employeeId) => {
    fetch("http://localhost/login-backend/fetchemployeedetails.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: employeeId }), // Passing employeeId from users table
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch employee details");
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setIsFormVisible(true); // Show form if employee details are missing
        } else {
          setEmployeeDetails(data);
          setIsFormVisible(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsFormVisible(true); // Show form in case of error
      });
  };

  const employeeElements = employees.map((employee) => (
    <li
      key={employee.id} // Ensure employee.id is unique
      onClick={() => {
        setSelectedEmployee(selectedEmployee?.id === employee.id ? null : employee);
        fetchEmployeeDetails(employee.id); // Pass employee id as foreign key
      }}
      className={`py-2 px-3 cursor-pointer rounded hover:bg-blue-50 ${
        selectedEmployee?.id === employee.id ? "bg-blue-100 font-bold" : ""
      }`}
    >
      {employee.username}
    </li>
  ));

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h3 className="text-xl font-semibold mb-4">Employee List</h3>
      <ul className="divide-y">
        {employeeElements}
      </ul>

      {isFormVisible ? (
        <form className="mt-4 p-4 bg-gray-50 rounded shadow">
          <h3 className="text-lg font-bold mb-2">Employee Details</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={employeeDetails?.name || ""}
            className="block w-full mb-2 p-2 border rounded"
            disabled
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={employeeDetails?.age || ""}
            className="block w-full mb-2 p-2 border rounded"
            disabled
          />
          <textarea
            name="address"
            placeholder="Address"
            value={employeeDetails?.address || ""}
            className="block w-full mb-2 p-2 border rounded"
            disabled
          ></textarea>
          <input
            type="text"
            name="account_number"
            placeholder="Account Number"
            value={employeeDetails?.account_number || ""}
            className="block w-full mb-2 p-2 border rounded"
            disabled
          />
          <input
            type="text"
            name="ifsc_code"
            placeholder="IFSC Code"
            value={employeeDetails?.ifsc_code || ""}
            className="block w-full mb-2 p-2 border rounded"
            disabled
          />
          <input
            type="text"
            name="salary_basic"
            placeholder="Basic Salary"
            value={employeeDetails?.salary_basic || ""}
            className="block w-full mb-2 p-2 border rounded"
            disabled
          />
          <input
            type="text"
            name="salary_da"
            placeholder="DA"
            value={employeeDetails?.salary_da || ""}
            className="block w-full mb-2 p-2 border rounded"
            disabled
          />
          <input
            type="text"
            name="salary_hra"
            placeholder="HRA"
            value={employeeDetails?.salary_hra || ""}
            className="block w-full mb-2 p-2 border rounded"
            disabled
          />
          <input
            type="text"
            name="salary_maintenance"
            placeholder="Maintenance"
            value={employeeDetails?.salary_maintenance || ""}
            className="block w-full mb-2 p-2 border rounded"
            disabled
          />
        </form>
      ) : (
        employeeDetails && (
          <div className="mt-4 p-4 bg-gray-50 rounded shadow">
            <h2 className="text-xl font-bold mb-2">{employeeDetails.username}</h2>
            <p><strong>Name:</strong> {employeeDetails.name}</p>
            <p><strong>Age:</strong> {employeeDetails.age}</p>
            <p><strong>Address:</strong> {employeeDetails.address}</p>
            <p><strong>Account Number:</strong> {employeeDetails.account_number}</p>
            <p><strong>IFSC Code:</strong> {employeeDetails.ifsc_code}</p>
            <p><strong>Basic Salary:</strong> {employeeDetails.salary_basic}</p>
            <p><strong>DA:</strong> {employeeDetails.salary_da}</p>
            <p><strong>HRA:</strong> {employeeDetails.salary_hra}</p>
            <p><strong>Maintenance Allowance:</strong> {employeeDetails.salary_maintenance}</p>
          </div>
        )
      )}
    </div>
  );
};

export default EmployeeList;