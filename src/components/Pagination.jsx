import React from "react";
const Pagination = ({ currentPage, totalPages, setCurrentPage }) => (
  <div className="flex justify-center mt-4">
    <button
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
    >
      Prev
    </button>
    <span className="px-3 py-1 mx-1">Page {currentPage} of {totalPages}</span>
    <button
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
);
export default Pagination;