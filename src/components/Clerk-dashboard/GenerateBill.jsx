import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const GenerateBill = () => {
  const { clientId, projectId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDownloadBill = () => {
    const doc = new jsPDF();

    // Fetch data from the backend
    fetch(`/api/get_bill_data.php?clientId=${clientId}&projectId=${projectId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Check if there's an error in the data
        if (data.error) {
          console.error("Error fetching bill data:", data.error);
          alert("Error fetching bill data. Please try again.");
          return;
        }

        // Permanent fields
        doc.setFontSize(16);
        doc.text(data.projectName || "Project Name", 20, 20); // Left: Project Name
        doc.setFontSize(10);
        doc.text(`Invoice No: ${data.invoiceNo}`, 150, 20, { align: "right" }); // Right: Invoice No
        doc.text(`Date: ${data.date}`, 150, 30, { align: "right" });
        doc.text(`Delivery Challan No: ${data.deliveryChallanNo}`, 150, 40, { align: "right" });

        // Item table
        doc.autoTable({
          head: [["Description", "Quantity", "Unit", "Rate", "Total"]],
          body: data.items.map((item) => [
            item.description,
            item.quantity,
            item.unit,
            item.rate,
            item.total,
          ]),
          startY: 50,
          headStyles: {
            fillColor: [22, 160, 133], // Header color
            textColor: [255, 255, 255], // White text
          },
          styles: {
            fillColor: [240, 240, 240], // Row color
            textColor: [0, 0, 0], // Black text
            halign: "center",
          },
        });

        // Tax and totals
        doc.text(`Taxable Value: ${data.taxableValue}`, 20, doc.lastAutoTable.finalY + 10);
        doc.text(`IGST (18%): ${data.igst}`, 20, doc.lastAutoTable.finalY + 20);
        doc.text(`Rounded Off: ${data.roundedOff}`, 20, doc.lastAutoTable.finalY + 30);
        doc.text(`Grand Total: ${data.grandTotal}`, 20, doc.lastAutoTable.finalY + 40);

        // Footer
        doc.text(data.amountInWords || "Amount in Words", 20, doc.lastAutoTable.finalY + 50);
        doc.text("Authorized Signature", 20, doc.lastAutoTable.finalY + 70);
        doc.text("Director", 20, doc.lastAutoTable.finalY + 80);

        // Save PDF
        doc.save(`Bill_${data.invoiceNo}.pdf`);
      })
      .catch((error) => {
        console.error("Error fetching bill data:", error);
        alert("An error occurred while fetching the bill data. Please try again.");
      });
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        <header className="flex items-center mb-4">
          <button onClick={() => navigate(-1)} className="text-gray-700 font-semibold">
            &larr; Back
          </button>
          <h2 className="text-2xl font-bold text-center flex-grow">Generate Bill</h2>
        </header>

        <div className="mb-6">
          <h3 className="text-xl font-semibold">
            Project ID: <span className="text-gray-600">{projectId}</span>
          </h3>
          <h4 className="text-lg text-gray-500">Client ID: {clientId}</h4>
        </div>

        <div className="border-t border-gray-200 mt-6 pt-4">
          <h4 className="text-lg font-semibold mb-2">Generate PDF</h4>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Generate PDF
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Confirmation</h3>
            <p className="text-gray-600 mb-6">
              Once the bill is generated, you cannot make changes. Do you wish to proceed?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  handleDownloadBill();
                }}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateBill;
