import React from "react";
import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

const notifications = [
  { id: 1, type: "info", message: "New update available! Click to install." },
  { id: 2, type: "success", message: "Your payment was successful." },
  { id: 3, type: "warning", message: "Your subscription will expire in 3 days." },
  { id: 4, type: "error", message: "Failed to connect to the server." },
];

const getIcon = (type) => {
  switch (type) {
    case "info":
      return <FaInfoCircle className="text-blue-500 text-xl" />;
    case "success":
      return <FaCheckCircle className="text-green-500 text-xl" />;
    case "warning":
      return <FaExclamationTriangle className="text-yellow-500 text-xl" />;
    case "error":
      return <FaTimesCircle className="text-red-500 text-xl" />;
    default:
      return null;
  }
};

const NotificationPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-xl overflow-hidden">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white p-4 shadow-sm z-10 flex justify-between items-center">
          <h2 className="text-xl font-bold">Notifications</h2>
          <button className="text-sm text-blue-500 hover:underline">Clear All</button>
        </div>

        {/* Notification List */}
        <div className="flex flex-col divide-y divide-gray-200">
          {notifications.map((note) => (
            <div
              key={note.id}
              className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            >
              {getIcon(note.type)}
              <p className="text-gray-700">{note.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
