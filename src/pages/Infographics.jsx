import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';
import { Zap, Star, LayoutDashboard, Activity, TrendingUp } from 'lucide-react';

const InfographicsPage = () => {
  const [themeIndex, setThemeIndex] = useState(0);
  const [sparks, setSparks] = useState([]);

  const themes = [
    'bg-gradient-to-br from-sky-700 via-blue-800 to-indigo-900',
    'bg-gradient-to-br from-rose-600 via-pink-700 to-purple-800',
    'bg-gradient-to-br from-green-700 via-teal-800 to-emerald-900'
  ];

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const pieData = [
    { name: 'Design', value: 400 },
    { name: 'Dev', value: 300 },
    { name: 'Analytics', value: 300 },
    { name: 'Music', value: 200 },
    { name: 'AI', value: 278 }
  ];

  const barData = [
    { name: 'Jan', Users: 4000, Sales: 2400 },
    { name: 'Feb', Users: 3000, Sales: 1398 },
    { name: 'Mar', Users: 2000, Sales: 9800 },
    { name: 'Apr', Users: 2780, Sales: 3908 },
    { name: 'May', Users: 1890, Sales: 4800 },
    { name: 'Jun', Users: 2390, Sales: 3800 },
    { name: 'Jul', Users: 3490, Sales: 4300 }
  ];

  const lineData = [
    { name: 'Mon', Performance: 400 },
    { name: 'Tue', Performance: 300 },
    { name: 'Wed', Performance: 500 },
    { name: 'Thu', Performance: 278 },
    { name: 'Fri', Performance: 189 },
    { name: 'Sat', Performance: 239 },
    { name: 'Sun', Performance: 349 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSparks((prev) => [
        ...prev,
        { id: Date.now(), x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }
      ].slice(-40));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const switchTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  return (
    <div className={`relative min-h-screen ${themes[themeIndex]} text-white overflow-hidden`}>
      {sparks.map((spark) => (
        <div key={spark.id} className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-ping" style={{ top: spark.y, left: spark.x }} />
      ))}

      <header className="text-center py-16">
        <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
          Visual Insights Hub
        </h1>
        <p className="mt-3 text-white/70 text-lg max-w-3xl mx-auto">
          Unlock the power of data with beautiful, interactive, and responsive visualizations.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-20 grid gap-10 lg:grid-cols-3">
        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><LayoutDashboard className="w-5 h-5" /> Engagement Metrics</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#4b5563' }} />
              <Legend />
              <Bar dataKey="Users" fill="#60a5fa" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Sales" fill="#34d399" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Weekly Trends</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#4b5563' }} />
              <Legend />
              <Line type="monotone" dataKey="Performance" stroke="#f472b6" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Activity className="w-5 h-5" /> Category Breakdown</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={90} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </main>

      <div className="text-center py-10">
        <button
          onClick={switchTheme}
          className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition"
        >
          <Zap className="inline-block w-5 h-5 mr-2" /> Change Theme
        </button>
      </div>

      <footer className="text-center py-6 text-white/60 border-t border-white/10">
        © 2025 Tinitiate. All rights reserved.
      </footer>
    </div>
  );
};

export default InfographicsPage;
