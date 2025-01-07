import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewQuotation = () => {
  const [quotations, setQuotations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch quotations from backend
    const url = "http://your-server-url/get_quotations.php";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setQuotations(data.quotations); // Assume 'quotations' is an array
        } else {
          console.error("Failed to fetch quotations.");
        }
      })
      .catch((error) => {
        console.error("Error fetching quotations:", error);
      });
  }, []);

  const handleDelete = (id) => {
    // Call backend API to delete the quotation
    const url = `http://your-server-url/delete_quotation.php?id=${id}`;

    fetch(url, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setQuotations(quotations.filter((q) => q.id !== id));
        } else {
          console.error("Failed to delete quotation.");
        }
      })
      .catch((error) => {
        console.error("Error deleting quotation:", error);
      });
  };

  const handleView = (id) => navigate(`/view-details/${id}`);
  const handleModify = (id) => navigate(`/modify-quotation/${id}`);

  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 bg-gray-200 p-4">
        <h3 className="font-bold text-lg mb-2">Projects</h3>
        <ul>
          {quotations.map((q) => (
            <li key={q.id} className="p-2 border mb-2 bg-white">
              {q.projectName}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 bg-gray-100 p-4">
        <h3 className="font-bold text-lg mb-2">Actions</h3>
        {quotations.map((q) => (
          <div
            key={q.id}
            className="flex justify-between items-center p-2 border mb-2 bg-white"
          >
            <span>{q.projectName}</span>
            <div>
              <button
                onClick={() => handleView(q.id)}
                className="bg-blue-500 text-white p-1 rounded mr-2"
              >
                View
              </button>
              <button
                onClick={() => handleModify(q.id)}
                className="bg-yellow-500 text-white p-1 rounded mr-2"
              >
                Modify
              </button>
              <button
                onClick={() => handleDelete(q.id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewQuotation;
