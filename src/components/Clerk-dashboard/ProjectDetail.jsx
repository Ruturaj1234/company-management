// ProjectDetail.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate for routing
import { FaFileInvoiceDollar, FaUpload, FaArrowLeft } from "react-icons/fa"; // Import icons

const ProjectDetail = () => {
  const { clientId, projectId } = useParams(); // Get client ID and project ID from URL
  const navigate = useNavigate(); // Initialize navigate function

  // State management for bill
  const [showBill, setShowBill] = useState(false);
  const [bills, setBills] = useState([]); // State to hold saved bills
  const [billData, setBillData] = useState({
    clientName: "",
    invoiceNo: "",
    date: "",
    poNo: "",
    description: "",
    quantity: "",
    rate: "",
    total: "",
  });

  // State management for quotation
  const [showQuotation, setShowQuotation] = useState(false);
  const [quotations, setQuotations] = useState([]); // State to hold saved quotations
  const [quotationData, setQuotationData] = useState({
    clientName: "",
    projectDescription: "",
    estimatedCost: "",
    additionalNotes: "",
  });

  // Define media array
  const media = ["image1.jpg", "image2.jpg"]; // Example media files, adjust paths as necessary

  const handleGenerateQuotation = () => {
    setShowQuotation(true);
    setShowBill(false); // Hide bill form
  };

  const handleGenerateBill = () => {
    setShowBill(true);
    setShowQuotation(false); // Hide quotation form
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleBillInputChange = (e) => {
    const { name, value } = e.target;
    setBillData({ ...billData, [name]: value });
  };

  const handleQuotationInputChange = (e) => {
    const { name, value } = e.target;
    setQuotationData({ ...quotationData, [name]: value });
  };

  const handleSaveBill = () => {
    setBills([...bills, billData]);
    setBillData({
      clientName: "",
      invoiceNo: "",
      date: "",
      poNo: "",
      description: "",
      quantity: "",
      rate: "",
      total: "",
    });
    setShowBill(false);
  };

  const handleDownloadBill = () => {
    const billContent = `
      Invoice No: ${billData.invoiceNo}
      Date: ${billData.date}
      Client Name: ${billData.clientName}
      P.O. No: ${billData.poNo}
      Description: ${billData.description}
      Quantity: ${billData.quantity}
      Rate: ${billData.rate}
      Total: ${billData.total}
    `;
    const blob = new Blob([billContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Bill_${billData.invoiceNo}.txt`;
    link.click();
  };

  const handleSaveQuotation = () => {
    setQuotations([...quotations, quotationData]);
    setQuotationData({
      clientName: "",
      projectDescription: "",
      estimatedCost: "",
      additionalNotes: "",
    });
    setShowQuotation(false);
  };

  const handleDownloadQuotation = () => {
    const quotationContent = `
      Client Name: ${quotationData.clientName}
      Project Description: ${quotationData.projectDescription}
      Estimated Cost: ${quotationData.estimatedCost}
      Additional Notes: ${quotationData.additionalNotes}
    `;
    const blob = new Blob([quotationContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Quotation_${quotationData.clientName}.txt`;
    link.click();
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        <header className="flex items-center mb-4">
          <button onClick={handleBack} className="text-gray-700">
            <FaArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-bold mx-auto">Project Details</h2>
          <img
            src="https://www.saisamarthpolytech.com/images/logo.png" // Replace with your logo URL
            alt="Logo"
            className="h-10 w-auto ml-4"
          />
        </header>

        <div className="mb-6">
          <h3 className="text-xl font-semibold">Project Name: <span className="text-gray-600">Project {projectId}</span></h3>
          <h4 className="text-lg text-gray-500">Client ID: {clientId}</h4>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold">Actions</h4>
          <div className="flex space-x-4">
            <button
              onClick={handleGenerateQuotation}
              className="bg-green-600 text-white px-4 py-2 rounded flex items-center transition duration-300 hover:bg-green-700"
            >
              <FaFileInvoiceDollar className="mr-2" />
              Generate Quotation
            </button>
            <button
              onClick={handleGenerateBill}
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center transition duration-300 hover:bg-blue-700"
            >
              <FaFileInvoiceDollar className="mr-2" />
              Generate Bill
            </button>
          </div>
        </div>

        {/* Quotation Form */}
        {showQuotation && (
          <div className="border-t border-gray-200 mt-6 pt-4">
            <h4 className="text-lg font-semibold mb-2">Quotation Details</h4>
            <form className="flex flex-col space-y-4">
              <label>
                Client Name:
                <input
                  type="text"
                  name="clientName"
                  value={quotationData.clientName}
                  onChange={handleQuotationInputChange}
                  placeholder="Enter client name"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </label>
              <label>
                Project Description:
                <input
                  type="text"
                  name="projectDescription"
                  value={quotationData.projectDescription}
                  onChange={handleQuotationInputChange}
                  placeholder="Enter project description"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </label>
              <label>
                Estimated Cost (Rs.):
                <input
                  type="number"
                  name="estimatedCost"
                  value={quotationData.estimatedCost}
                  onChange={handleQuotationInputChange}
                  placeholder="Enter estimated cost"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </label>
              <label>
                Additional Notes:
                <textarea
                  name="additionalNotes"
                  value={quotationData.additionalNotes}
                  onChange={handleQuotationInputChange}
                  placeholder="Enter any additional notes"
                  rows="4"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleSaveQuotation}
                  className="bg-orange-600 text-white px-4 py-2 rounded mt-2"
                >
                  Save Quotation
                </button>
                <button
                  type="button"
                  onClick={handleDownloadQuotation}
                  className="bg-green-600 text-white px-4 py-2 rounded mt-2"
                >
                  Download Quotation
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Bill Form */}
        {showBill && (
          <div className="border-t border-gray-200 mt-6 pt-4">
            <h4 className="text-lg font-semibold mb-2">Bill Details</h4>
            <form className="flex flex-col space-y-4">
              <label>
                Client Name:
                <input
                  type="text"
                  name="clientName"
                  value={billData.clientName}
                  onChange={handleBillInputChange}
                  placeholder="Enter client name"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </label>
              <label>
                Invoice No:
                <input
                  type="text"
                  name="invoiceNo"
                  value={billData.invoiceNo}
                  onChange={handleBillInputChange}
                  placeholder="Enter invoice number"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={billData.date}
                  onChange={handleBillInputChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </label>
              <label>
                P.O. No:
                <input
                  type="text"
                  name="poNo"
                  value={billData.poNo}
                  onChange={handleBillInputChange}
                  placeholder="Enter P.O. number"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  value={billData.description}
                  onChange={handleBillInputChange}
                  placeholder="Enter description"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </label>
              <label>
                Quantity:
                <input
                  type="number"
                  name="quantity"
                  value={billData.quantity}
                  onChange={handleBillInputChange}
                  placeholder="Enter quantity"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </label>
              <label>
                Rate:
                <input
                  type="number"
                  name="rate"
                  value={billData.rate}
                  onChange={handleBillInputChange}
                  placeholder="Enter rate"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </label>
              <label>
                Total:
                <input
                  type="number"
                  name="total"
                  value={billData.total}
                  onChange={handleBillInputChange}
                  placeholder="Enter total"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleSaveBill}
                  className="bg-orange-600 text-white px-4 py-2 rounded mt-2"
                >
                  Save Bill
                </button>
                <button
                  type="button"
                  onClick={handleDownloadBill}
                  className="bg-green-600 text-white px-4 py-2 rounded mt-2"
                >
                  Download Bill
                </button>
              </div>
            </form>
          </div>
        )}

        {/* View Saved Quotations */}
        {quotations.length > 0 && (
          <div className="border-t border-gray-200 mt-6 pt-4">
            <h4 className="text-lg font-semibold mb-2">Saved Quotations</h4>
            <ul className="list-disc list-inside">
              {quotations.map((quotation, index) => (
                <li key={index} className="bg-gray-100 p-2 rounded mb-2">
                  Client Name: {quotation.clientName} - Project Description: {quotation.projectDescription}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* View Saved Bills */}
        {bills.length > 0 && (
          <div className="border-t border-gray-200 mt-6 pt-4">
            <h4 className="text-lg font-semibold mb-2">Saved Bills</h4>
            <ul className="list-disc list-inside">
              {bills.map((bill, index) => (
                <li key={index} className="bg-gray-100 p-2 rounded mb-2">
                  Invoice No: {bill.invoiceNo} - Client Name: {bill.clientName}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Media Section */}
        <div className="border-t border-gray-200 mt-6 pt-4">
          <h4 className="text-lg font-semibold mb-2">Media Files</h4>
          <div className="grid grid-cols-2 gap-4">
            {media.map((image, index) => (
              <div key={index} className="bg-gray-200 p-2 rounded">
                <img
                  src={`/${image}`} // Adjust image path accordingly
                  alt={`Media ${index + 1}`}
                  className="w-full h-auto rounded"
                />
                <p className="text-sm text-gray-500">Description for {image}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
