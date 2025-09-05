import { useState } from "react";

export default function ShipmentTable({ shipments }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Calculate pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentShipments = shipments.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(shipments.length / rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Topic</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Created By</th>
            <th className="px-4 py-2 border">Created Date</th>
            <th className="px-4 py-2 border">Logistic</th>
            <th className="px-4 py-2 border">Remark</th>
            <th className="px-4 py-2 border">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {currentShipments.map((s) => (
            <tr
              key={s.shipmentRequestID}
              className="text-center hover:bg-gray-50"
            >
              <td className="px-4 py-2 border">{s.shipmentRequestID}</td>
              <td className="px-4 py-2 border">{s.topic}</td>
              <td className="px-4 py-2 border text-green-600 font-semibold">
                {s.request_status}
              </td>
              <td className="px-4 py-2 border">{s.created_user_name}</td>
              <td className="px-4 py-2 border">{s.created_date_time}</td>
              <td className="px-4 py-2 border">{s.logistic_user_name}</td>
              <td className="px-4 py-2 border">{s.remark}</td>
              <td className="px-4 py-2 border">{s.due_date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t">
        {/* Rows per page */}
        <div>
          <label className="mr-2 text-sm text-gray-600">Rows per page:</label>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1 text-sm"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
