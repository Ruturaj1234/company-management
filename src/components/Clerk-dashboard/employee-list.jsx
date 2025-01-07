// EmployeeList.js
import React, { useState } from "react";

const EmployeeList = ({ employees, selectedEmployee, setSelectedEmployee }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h3 className="text-xl font-semibold mb-4">Employee List</h3>
      <ul className="divide-y">
        {employees.map((employee) => (
          <li
            key={employee.id}
            onClick={() => setSelectedEmployee(selectedEmployee?.id === employee.id ? null : employee)}
            className={`py-2 px-3 cursor-pointer rounded hover:bg-blue-50 ${
              selectedEmployee?.id === employee.id ? "bg-blue-100 font-bold" : ""
            }`}
          >
            {employee.username}
          </li>
        ))}
      </ul>

      {selectedEmployee && (
        <div className="mt-4 p-4 bg-gray-50 rounded shadow">
          <h2 className="text-xl font-bold mb-2">{selectedEmployee.username}</h2>
          <div>
            <h3 className="font-bold">Personal Details:</h3>
            <p>Name: {selectedEmployee.personalDetails.name}</p>
            <p>Age: {selectedEmployee.personalDetails.age}</p>
            <p>Address: {selectedEmployee.personalDetails.address}</p>
          </div>
          <div className="mt-2">
            <h3 className="font-bold">Bank Details:</h3>
            <p>Account Number: {selectedEmployee.bankDetails.accountNumber}</p>
            <p>IFSC Code: {selectedEmployee.bankDetails.ifsc}</p>
          </div>
          <div className="mt-2">
            <h3 className="font-bold">Salary Details:</h3>
            <p>Basic: {selectedEmployee.salary.basic}</p>
            <p>DA: {selectedEmployee.salary.da}</p>
            <p>HRA: {selectedEmployee.salary.hra}</p>
            <p>Maintenance: {selectedEmployee.salary.maintenance}</p>
          </div>
          <div className="mt-2">
            <h3 className="font-bold">Projects:</h3>
            <ul className="list-disc pl-4">
              {selectedEmployee.projects.map((project, index) => (
                <li key={index}>{project}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => alert(`Edit functionality for ${selectedEmployee.username}`)}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => {
                // Handle employee deletion logic here
                alert(`Deleted ${selectedEmployee.username}`);
                setSelectedEmployee(null);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
