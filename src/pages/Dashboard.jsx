import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend
} from "recharts";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  // Dummy Data
  const salesData = [
    { name: "Mon", sales: 40 },
    { name: "Tue", sales: 30 },
    { name: "Wed", sales: 50 },
    { name: "Thu", sales: 70 },
    { name: "Fri", sales: 90 },
    { name: "Sat", sales: 60 },
    { name: "Sun", sales: 80 },
  ];

  const pieData = [
    { name: "Completed", value: 400 },
    { name: "Pending", value: 300 },
    { name: "Cancelled", value: 100 },
  ];
  const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

  const recentOrders = [
    { id: "ORD001", customer: "John Doe", total: "$120", status: "Completed" },
    { id: "ORD002", customer: "Jane Smith", total: "$80", status: "Pending" },
    { id: "ORD003", customer: "Mike Ross", total: "$150", status: "Cancelled" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">📊 Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-indigo-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-2xl font-bold">$12,450</p>
        </div>
        <div className="bg-indigo-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Orders</h3>
          <p className="text-2xl font-bold">245</p>
        </div>
        <div className="bg-indigo-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Users</h3>
          <p className="text-2xl font-bold">1,204</p>
        </div>
        <div className="bg-indigo-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Revenue</h3>
          <p className="text-2xl font-bold">$8,720</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Line Chart */}
        <div className="bg-white p-4 shadow rounded col-span-2">
          <h3 className="text-xl font-semibold mb-4">Sales Trends</h3>
          <LineChart width={500} height={250} data={salesData}>
            <Line type="monotone" dataKey="sales" stroke="#4F46E5" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>

        {/* Order Status Pie Chart */}
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-xl font-semibold mb-4">Order Status</h3>
          <PieChart width={250} height={250}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Recent Orders */}
        <div className="bg-white p-4 shadow rounded col-span-2">
          <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">Order ID</th>
                <th className="border-b p-2">Customer</th>
                <th className="border-b p-2">Total</th>
                <th className="border-b p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index}>
                  <td className="border-b p-2">{order.id}</td>
                  <td className="border-b p-2">{order.customer}</td>
                  <td className="border-b p-2">{order.total}</td>
                  <td
                    className={`border-b p-2 font-semibold ${
                      order.status === "Completed"
                        ? "text-green-600"
                        : order.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calendar Widget */}
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-xl font-semibold mb-4">Calendar</h3>
          <Calendar value={date} onChange={setDate} />
          <p className="mt-2 text-gray-600">
            Selected date: <strong>{date.toDateString()}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
