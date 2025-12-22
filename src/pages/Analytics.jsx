// src/pages/Analytics.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, Legend
} from "recharts";

/**
 * Professional Analytics Page (single-file)
 * - Requires: recharts
 * - Uses only native date inputs (no extra date libraries)
 */

const COLORS = ["#4F46E5", "#06B6D4", "#F59E0B", "#EF4444", "#10B981"];

const generateTimeSeries = (start, end, granularity = "day") => {
  // returns an array of { date: "YYYY-MM-DD", visits, signups, revenue, orders }
  const data = [];
  let cur = new Date(start);
  const endDate = new Date(end);
  const add = (d, g) => {
    if (g === "day") d.setDate(d.getDate() + 1);
    if (g === "week") d.setDate(d.getDate() + 7);
    if (g === "month") d.setMonth(d.getMonth() + 1);
  };

  while (cur <= endDate) {
    const label = cur.toISOString().slice(0, 10);
    // fake but plausible numbers with randomness
    const visits = Math.floor(200 + Math.random() * 800);
    const orders = Math.max(1, Math.floor(visits * (0.02 + Math.random() * 0.05)));
    const signups = Math.floor(visits * (0.01 + Math.random() * 0.02));
    const revenue = Math.round((orders * (20 + Math.random() * 200)) * 100) / 100;
    data.push({ date: label, visits, orders, signups, revenue });
    add(cur, granularity);
  }
  return data;
};

const sampleTopPages = () => [
  { name: "/home", views: 1200 },
  { name: "/products", views: 980 },
  { name: "/pricing", views: 600 },
  { name: "/blog", views: 420 },
  { name: "/contact", views: 200 },
];

const sampleTrafficSources = () => [
  { name: "Organic Search", value: 48 },
  { name: "Direct", value: 25 },
  { name: "Referral", value: 12 },
  { name: "Social", value: 10 },
  { name: "Email", value: 5 },
];

const sampleDeviceBreakdown = () => [
  { name: "Desktop", value: 55 },
  { name: "Mobile", value: 38 },
  { name: "Tablet", value: 7 },
];

export default function Analytics() {
  const today = new Date();
  const defaultStart = new Date(today);
  defaultStart.setDate(defaultStart.getDate() - 30);

  const [startDate, setStartDate] = useState(defaultStart.toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(today.toISOString().slice(0, 10));
  const [granularity, setGranularity] = useState("day"); // day|week|month

  // real-time live users simulation
  const [liveUsers, setLiveUsers] = useState(12);
  const realtimeRef = useRef([]);
  const [realtimeTick, setRealtimeTick] = useState(0);

  // event/activity log
  const [activity, setActivity] = useState([
    { time: new Date().toLocaleString(), text: "Admin created discount code SUMMER25" },
    { time: new Date().toLocaleString(), text: "New order #ORD1023 placed" },
    { time: new Date().toLocaleString(), text: "Product 'Pro Headphones' back in stock" },
  ]);

  // generate timeseries (memoized)
  const timeseries = useMemo(() => {
    const data = generateTimeSeries(startDate, endDate, granularity);
    // keep a small moving average for smoother charts
    return data;
  }, [startDate, endDate, granularity, realtimeTick]);

  // derived KPIs
  const totals = useMemo(() => {
    const visits = timeseries.reduce((s, d) => s + d.visits, 0);
    const revenue = timeseries.reduce((s, d) => s + d.revenue, 0);
    const orders = timeseries.reduce((s, d) => s + d.orders, 0);
    const signups = timeseries.reduce((s, d) => s + d.signups, 0);
    const conversion = visits ? ((orders / visits) * 100) : 0;
    return {
      visits, revenue: Math.round(revenue), orders, signups, conversion: Math.round(conversion * 100) / 100
    };
  }, [timeseries]);

  // top pages & sources
  const topPages = sampleTopPages();
  const sources = sampleTrafficSources();
  const devices = sampleDeviceBreakdown();

  // simulate real-time updates
  useEffect(() => {
    const id = setInterval(() => {
      // small random changes to live users
      setLiveUsers((u) => Math.max(0, u + Math.floor(Math.random() * 5 - 2)));
      // keep a short realtime array for plotting sparkline
      const now = new Date();
      realtimeRef.current = [...realtimeRef.current.slice(-19), { t: now.toLocaleTimeString(), users: 8 + Math.floor(Math.random() * 25) }];
      setRealtimeTick((t) => t + 1);
    }, 4000); // every 4s
    return () => clearInterval(id);
  }, []);

  // click to add event to calendar/activities (demo)
  const quickAddEvent = (text) => {
    setActivity((a) => [{ time: new Date().toLocaleString(), text }, ...a].slice(0, 20));
  };

  // funnel mock (visitors -> viewed product -> add to cart -> checkout)
  const funnel = { visitors: 10000, viewed: 3200, cart: 480, checkout: 120 };

  return (
    <div className="p-6 min-h-screen bg-gray-50 text-gray-800">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-3xl font-bold text-indigo-700">📈 Analytics</h1>

        {/* controls */}
        <div className="flex items-center gap-2 bg-white p-2 rounded shadow">
          <label className="text-xs text-gray-500">From</label>
          <input
            type="date"
            className="border p-1 rounded text-sm"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label className="text-xs text-gray-500 ml-2">To</label>
          <input
            type="date"
            className="border p-1 rounded text-sm"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <select
            className="border ml-2 p-1 rounded text-sm"
            value={granularity}
            onChange={(e) => setGranularity(e.target.value)}
            title="Granularity"
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>

          <button
            className="ml-2 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
            onClick={() => quickAddEvent("Manual snapshot taken")}
          >
            Snapshot
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Revenue</div>
          <div className="text-2xl font-bold">₹{totals.revenue.toLocaleString()}</div>
          <div className="text-xs text-green-600 mt-1">+{(Math.random()*10).toFixed(1)}% vs last period</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Orders</div>
          <div className="text-2xl font-bold">{totals.orders}</div>
          <div className="text-xs text-indigo-600 mt-1">{totals.signups} signups</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Conversion</div>
          <div className="text-2xl font-bold">{totals.conversion}%</div>
          <div className="text-xs text-yellow-600 mt-1">Goal: 4.5%</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Live Users</div>
          <div className="text-2xl font-bold">{liveUsers}</div>
          <div className="text-xs text-gray-500 mt-1">Active right now</div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Large timeseries (span 2 columns on large) */}
        <div className="lg:col-span-2 bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Traffic & Revenue</h3>
            <div className="text-sm text-gray-500">Showing {granularity} data</div>
          </div>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={timeseries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" minTickGap={20} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="visits" stroke="#4F46E5" name="Visits" strokeWidth={2} />
                <Line type="monotone" dataKey="orders" stroke="#10B981" name="Orders" strokeWidth={2} />
                <Line type="monotone" dataKey="revenue" stroke="#F59E0B" name="Revenue" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 text-sm text-gray-500">
            Tip: Use the date filters or change granularity to analyze different time windows.
          </div>
        </div>

        {/* Right column: pie charts + mini area */}
        <div className="bg-white p-4 rounded shadow space-y-4">
          <div>
            <h4 className="font-medium">Traffic Sources</h4>
            <div style={{ width: "100%", height: 160 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={sources} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} label>
                    {sources.map((entry, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h4 className="font-medium">Device Breakdown</h4>
            <div style={{ width: "100%", height: 120 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={devices} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={20} outerRadius={40}>
                    {devices.map((d, idx) => <Cell key={idx} fill={COLORS[(idx+1)%COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h4 className="font-medium">User Growth</h4>
            <div style={{ width: "100%", height: 80 }}>
              <ResponsiveContainer>
                <AreaChart data={timeseries}>
                  <Area type="monotone" dataKey="visits" stroke="#4F46E5" fill="rgba(79,70,229,0.15)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Row: Funnel, Top Pages, Recent Activity, Map */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
        {/* Funnel */}
        <div className="col-span-1 xl:col-span-1 bg-white p-4 rounded shadow">
          <h4 className="font-medium mb-3">Conversion Funnel</h4>
          <div className="space-y-2">
            {[
              { label: "Visitors", value: funnel.visitors, color: "#4F46E5" },
              { label: "Viewed Product", value: funnel.viewed, color: "#06B6D4" },
              { label: "Added to Cart", value: funnel.cart, color: "#F59E0B" },
              { label: "Checkout", value: funnel.checkout, color: "#10B981" },
            ].map((s, i) => {
              const pct = Math.round((s.value / funnel.visitors) * 10000) / 100;
              return (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <div>{s.label}</div>
                    <div className="font-semibold">{s.value} ({pct}%)</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded h-3">
                    <div style={{ width: `${pct}%` }} className="h-3 rounded" title={`${pct}%`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Pages */}
        <div className="col-span-1 xl:col-span-1 bg-white p-4 rounded shadow">
          <h4 className="font-medium mb-3">Top Pages</h4>
          <BarChart width={300} height={180} data={topPages}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="views" fill="#4F46E5" />
          </BarChart>
        </div>

        {/* Recent Activity */}
        <div className="col-span-1 xl:col-span-1 bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">Recent Activity</h4>
            <div className="text-sm text-gray-500">{activity.length} items</div>
          </div>

          <div className="space-y-2 max-h-48 overflow-auto">
            {activity.map((a, i) => (
              <div key={i} className="text-sm">
                <div className="text-xs text-gray-400">{a.time}</div>
                <div className="text-gray-700">{a.text}</div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={() => quickAddEvent("Quick promo scheduled")}>
              Quick Add
            </button>
            <button className="px-3 py-1 border rounded" onClick={() => setActivity([])}>
              Clear
            </button>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="col-span-1 xl:col-span-1 bg-white p-4 rounded shadow">
          <h4 className="font-medium mb-3">Geography</h4>
          <div className="border rounded p-2">
            {/* Simple SVG placeholder map — replace with map library if desired */}
            <svg viewBox="0 0 400 200" className="w-full h-40">
              <rect x="0" y="0" width="100%" height="100%" fill="#f3f4f6" rx="6" />
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#9CA3AF">Map Placeholder</text>
            </svg>
            <div className="text-sm text-gray-500 mt-2">Top country: India • Visitors: 3,420</div>
          </div>
        </div>
      </div>

      {/* Bottom: live users sparkline + quick insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-medium">Live Users (spark)</h4>
          <div className="text-lg font-bold">{liveUsers} online</div>
          <div className="mt-2 text-xs text-gray-500">Realtime updates every 4s (simulated)</div>
          <div className="mt-3">
            <ResponsiveContainer width="100%" height={60}>
              <LineChart data={realtimeRef.current.map((r, i) => ({ i, users: r.users }))}>
                <Line dataKey="users" stroke="#4F46E5" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-medium">Quick Insights</h4>
          <ul className="text-sm space-y-2 mt-3">
            <li>• Best performing channel: Organic Search</li>
            <li>• Peak hours: 6–9 PM</li>
            <li>• Cart abandonment improved by 3%</li>
            <li>• Top product: Pro Headphones</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-medium">Export / Actions</h4>
          <div className="flex gap-2 mt-3">
            <button className="px-3 py-1 bg-indigo-600 text-white rounded">Export CSV</button>
            <button className="px-3 py-1 border rounded" onClick={() => quickAddEvent("Exported CSV")}>Log</button>
          </div>
        </div>
      </div>
    </div>
  );
}
