import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const QuotationsList = () => {
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    // Load saved quotations from backend
    const url = 'http://your-server-url/get_quotations.php'; // PHP API URL to fetch quotations

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setQuotations(data.quotations); // Assuming the response has a 'quotations' array
        } else {
          console.error("Failed to fetch quotations.");
        }
      })
      .catch((error) => {
        console.error('Error fetching quotations:', error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Saved Quotations</h2>
        {quotations.length === 0 ? (
          <p>No quotations saved yet.</p>
        ) : (
          <ul className="space-y-4">
            {quotations.map((quotation, index) => (
              <li key={index} className="border border-gray-300 p-4 rounded flex justify-between">
                <div>
                  <h3 className="font-semibold">Ref. No: {quotation.referenceNo}</h3>
                  <p>Name: {quotation.name}</p>
                  <p>Address: {quotation.address}</p>
                </div>
                <Link
                  to={`/view-quotation/${quotation.id}`} // Link to the detail view (use a unique identifier)
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  View
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QuotationsList;
