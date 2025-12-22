import React, { useState, useEffect, useRef } from 'react';
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
  Layers,
  Mic,
  X
} from 'lucide-react';

const SearchPage = () => {
  const [sparks, setSparks] = useState([]);
  const [themeIndex, setThemeIndex] = useState(0);
  const [likedFeatures, setLikedFeatures] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const recognitionRef = useRef(null);

  const themes = [
    'from-cyan-400 to-blue-600',
    'from-orange-400 to-yellow-500',
    'from-pink-500 to-fuchsia-500',
    'from-teal-500 to-emerald-500'
  ];

  const tools = [
    {
      id: 'search',
      icon: <Search className="w-6 h-6 text-white" />, title: 'Advanced Search',
      desc: 'Search smarter with AI-driven accuracy.'
    },
    {
      id: 'code',
      icon: <Code2 className="w-6 h-6 text-white" />, title: 'Code Editor',
      desc: 'Write and test code in real-time.'
    },
    {
      id: 'security',
      icon: <ShieldCheck className="w-6 h-6 text-white" />, title: 'Security Suite',
      desc: 'Top-tier tools for privacy and safety.'
    },
    {
      id: 'cloud',
      icon: <Cloud className="w-6 h-6 text-white" />, title: 'Cloud Tools',
      desc: 'Sync and manage your workflow effortlessly.'
    },
    {
      id: 'design',
      icon: <Palette className="w-6 h-6 text-white" />, title: 'Design Studio',
      desc: 'Bring your creative visions to life.'
    },
    {
      id: 'animation',
      icon: <Sparkles className="w-6 h-6 text-white" />, title: 'Animation Tools',
      desc: 'Powerful motion design capabilities.'
    },
    {
      id: 'canvas',
      icon: <Wand2 className="w-6 h-6 text-white" />, title: 'Drawing Canvas',
      desc: 'Sketch, draw, and ideate freely.'
    },
    {
      id: 'collab',
      icon: <Users className="w-6 h-6 text-white" />, title: 'Live Collaboration',
      desc: 'Collaborate with others in real-time.'
    },
    {
      id: 'gallery',
      icon: <BookOpen className="w-6 h-6 text-white" />, title: 'Gallery Saver',
      desc: 'Save and revisit your best work.'
    },
    {
      id: 'custom',
      icon: <Settings className="w-6 h-6 text-white" />, title: 'Custom Features',
      desc: 'Add your own plugins and integrations.'
    },
    {
      id: 'achievements',
      icon: <Trophy className="w-6 h-6 text-white" />, title: 'Achievements Tracker',
      desc: 'Track and celebrate your milestones.'
    },
    {
      id: 'music',
      icon: <Music className="w-6 h-6 text-white" />, title: 'Music Integration',
      desc: 'Add mood and rhythm to your workspace.'
    },
    {
      id: '3d',
      icon: <Layers className="w-6 h-6 text-white" />, title: '3D Toolset',
      desc: 'Design and interact with 3D assets.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSparks((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight
        }
      ].slice(-40));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const toggleLike = (title) => {
    setLikedFeatures((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const switchTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) return;
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      alert(`You said: ${speechResult}`);
    };

    recognition.start();
  };

  return (
    <div className={`relative min-h-screen bg-gradient-to-br ${themes[themeIndex]} text-white overflow-hidden`}>
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="absolute w-2 h-2 bg-white rounded-full opacity-50 animate-ping"
          style={{ top: spark.y, left: spark.x }}
        />
      ))}

      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
          Explore & Search
        </h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Discover features, tools, and utilities built to supercharge creators, coders, and collaborators.
        </p>
        <button
          onClick={startVoiceSearch}
          className="mt-6 flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition"
        >
          <Mic className="w-4 h-4" /> Voice Search
        </button>
      </section>

      <section className="py-12 px-6 bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="relative group overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => setActivePopup(tool)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-30 transition duration-300" />
              <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <div>{tool.icon}</div>
                  <button onClick={(e) => { e.stopPropagation(); toggleLike(tool.title); }} className="hover:scale-110 transition">
                    <Heart
                      className={`w-5 h-5 ${
                        likedFeatures.includes(tool.title)
                          ? 'text-red-500 fill-current'
                          : 'text-white'
                      }`}
                    />
                  </button>
                </div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" /> {tool.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed tracking-wide">
                  {tool.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {activePopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl max-w-lg w-full text-white relative">
            <button onClick={() => setActivePopup(null)} className="absolute top-3 right-3">
              <X className="w-5 h-5 text-white/70 hover:text-white" />
            </button>
            <div className="text-3xl font-bold mb-2 flex items-center gap-2">
              {activePopup.icon} {activePopup.title}
            </div>
            <p className="text-white/60 mt-2">{activePopup.desc}</p>
            <div className="mt-4 text-sm text-white/50">
              This is a simulated popup. You can expand this section with additional content, buttons, or interactivity.
            </div>
          </div>
        </div>
      )}

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
        © 2025 Creative Studio. All rights reserved.
      </footer>
    </div>
  );
};

export default SearchPage;