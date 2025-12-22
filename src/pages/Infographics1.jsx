import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';
import { Zap, Star, PieChart as PieIcon, Activity, TrendingUp } from 'lucide-react';

const InfographicsPage = () => {
  const [themeIndex, setThemeIndex] = useState(0);
  const [sparks, setSparks] = useState([]);

  const themes = [
    'from-indigo-800 to-purple-900',
    'from-teal-700 to-green-700',
    'from-rose-700 to-pink-700',
    'from-slate-800 to-gray-900'
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

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
      ].slice(-50));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const switchTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  return (
    <div className={`relative min-h-screen bg-gradient-to-br ${themes[themeIndex]} text-white overflow-hidden`}>
      {sparks.map((spark) => (
        <div key={spark.id} className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-40 animate-ping" style={{ top: spark.y, left: spark.x }} />
      ))}

      <header className="text-center py-16">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
          Infographics Dashboard
        </h1>
        <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">
          Visually explore your project’s progress, metrics, and impact using vibrant charts and real-time data.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-10 mb-14">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md border border-white/20">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><PieIcon className="w-5 h-5" /> Category Share</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md border border-white/20">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5" /> User & Sales Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#4b5563' }} />
                <Legend />
                <Bar dataKey="Users" fill="#8884d8" />
                <Bar dataKey="Sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md border border-white/20">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Activity className="w-5 h-5" /> Weekly Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#4b5563' }} />
              <Legend />
              <Line type="monotone" dataKey="Performance" stroke="#f472b6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>

      <div className="text-center py-10">
        <button onClick={switchTheme} className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-3 rounded-full text-white font-semibold hover:scale-105 transition-all">
          <Zap className="inline w-5 h-5 mr-2" /> Switch Theme
        </button>
      </div>

      <footer className="text-center py-6 text-white/60 border-t border-white/10">
        © 2025 Tinitiate. All rights reserved.
      </footer>
    </div>
  );
};

export default InfographicsPage;
