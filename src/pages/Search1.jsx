import React, { useState, useEffect } from 'react';
import {
  Zap,
  Heart,
  Search,
  Code2,
  Palette,
  ShieldCheck,
  Cloud,
  Sparkles,
  Wand2,
  Edit3,
  BookOpen,
  Users,
  Star,
  Settings,
  Trophy,
  Music,
  Layers
} from 'lucide-react';

const SearchPage = () => {
  const [sparks, setSparks] = useState([]);
  const [themeIndex, setThemeIndex] = useState(0);
  const [likedFeatures, setLikedFeatures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const themes = [
    'from-[#1f2937] to-[#111827]',
    'from-[#0f172a] to-[#1e293b]',
    'from-[#1e3a8a] to-[#4f46e5]',
    'from-[#4c1d95] to-[#7e22ce]'
  ];

  const tools = [
    { icon: <Search className="w-6 h-6 text-white" />, title: 'Advanced Search', desc: 'Search smarter with AI-driven accuracy.', category: 'AI' },
    { icon: <Code2 className="w-6 h-6 text-white" />, title: 'Code Editor', desc: 'Write and test code in real-time.', category: 'Development' },
    { icon: <ShieldCheck className="w-6 h-6 text-white" />, title: 'Security Suite', desc: 'Top-tier tools for privacy and safety.', category: 'Development' },
    { icon: <Cloud className="w-6 h-6 text-white" />, title: 'Cloud Tools', desc: 'Sync and manage your workflow effortlessly.', category: 'Cloud' },
    { icon: <Palette className="w-6 h-6 text-white" />, title: 'Design Studio', desc: 'Bring your creative visions to life.', category: 'Design' },
    { icon: <Sparkles className="w-6 h-6 text-white" />, title: 'Animation Tools', desc: 'Powerful motion design capabilities.', category: 'Design' },
    { icon: <Wand2 className="w-6 h-6 text-white" />, title: 'Drawing Canvas', desc: 'Sketch, draw, and ideate freely.', category: 'Design' },
    { icon: <Users className="w-6 h-6 text-white" />, title: 'Live Collaboration', desc: 'Collaborate with others in real-time.', category: 'Collab' },
    { icon: <BookOpen className="w-6 h-6 text-white" />, title: 'Gallery Saver', desc: 'Save and revisit your best work.', category: 'Design' },
    { icon: <Settings className="w-6 h-6 text-white" />, title: 'Custom Features', desc: 'Add your own plugins and integrations.', category: 'Development' },
    { icon: <Trophy className="w-6 h-6 text-white" />, title: 'Achievements Tracker', desc: 'Track and celebrate your milestones.', category: 'AI' },
    { icon: <Music className="w-6 h-6 text-white" />, title: 'Music Integration', desc: 'Add mood and rhythm to your workspace.', category: 'Music' },
    { icon: <Layers className="w-6 h-6 text-white" />, title: '3D Toolset', desc: 'Design and interact with 3D assets.', category: 'Design' }
  ];

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSparks((prev) => [
        ...prev,
        { id: Date.now(), x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }
      ].slice(-40));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const toggleLike = (title) => {
    setLikedFeatures((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const switchTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  return (
    <div className={`relative min-h-screen bg-gradient-to-br ${themes[themeIndex]} text-white overflow-hidden`}>
      {sparks.map((spark) => (
        <div key={spark.id} className="absolute w-2 h-2 bg-white rounded-full opacity-50 animate-ping" style={{ top: spark.y, left: spark.x }} />
      ))}

      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
          Explore & Search
        </h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Discover features, tools, and utilities built to supercharge creators, coders, and collaborators.
        </p>
      </section>

      <section className="max-w-5xl mx-auto p-6 mt-12 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
        <h2 className="text-3xl font-bold text-white mb-6">🔎 Smart Search Panel</h2>

        <div className="flex gap-3 items-center mb-6">
          <input
            type="text"
            placeholder="Search tools or features..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-6 py-4 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-3 text-white font-semibold rounded-xl hover:scale-105 transition-transform">
            Search
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {['AI', 'Design', 'Collab', 'Music', 'Development', 'Cloud'].map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedCategory(tag)}
              className={`px-4 py-2 text-sm rounded-full transition ${selectedCategory === tag ? 'bg-purple-500 text-white' : 'bg-white/10 text-white hover:bg-purple-500/70'}`}
            >
              #{tag}
            </button>
          ))}
        </div>

        <select
          className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 mb-6"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option>All Categories</option>
          <option>Design</option>
          <option>Development</option>
          <option>Music</option>
          <option>Cloud</option>
          <option>AI</option>
          <option>Collab</option>
        </select>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, i) => (
            <div
              key={i}
              className="relative group rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 shadow-xl p-5 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl overflow-hidden"
            >
              <div className="absolute -top-1/2 left-1/2 w-96 h-96 bg-gradient-to-tr from-purple-500/20 via-indigo-400/20 to-blue-500/20 rounded-full blur-3xl transform -translate-x-1/2 group-hover:scale-125 transition-transform duration-500 z-0" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full">
                    {tool.icon}
                  </div>
                  <button onClick={() => toggleLike(tool.title)} className="hover:scale-110 transition">
                    <Heart
                      className={`w-5 h-5 ${
                        likedFeatures.includes(tool.title)
                          ? 'text-red-500 fill-current'
                          : 'text-white'
                      }`}
                    />
                  </button>
                </div>
                <h3 className="text-xl font-semibold text-white mb-1 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" /> {tool.title}
                </h3>
                <p className="text-sm text-white/70">{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center py-16">
        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-500">
          Fuel Your Search
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto mb-6">
          Click below to spark a new theme and find the tool that fits your imagination.
        </p>
        <button
          onClick={switchTheme}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition shadow-md"
        >
          <Zap className="inline-block w-5 h-5 mr-2" /> Fuel Creativity
        </button>
      </section>

      <footer className="text-center py-6 text-white/50 border-t border-white/10">
        © 2025 Tinitiate. All rights reserved.
      </footer>
    </div>
  );
};

export default SearchPage;
