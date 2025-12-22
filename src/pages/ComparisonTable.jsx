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
    // ...existing tools
  ];

  const comparisonData = [
    { feature: 'Real-time Collaboration', toolA: '✅', toolB: '❌', toolC: '✅' },
    { feature: '3D Asset Support', toolA: '✅', toolB: '✅', toolC: '❌' },
    { feature: 'AI Search', toolA: '✅', toolB: '❌', toolC: '✅' },
    { feature: 'Voice Commands', toolA: '✅', toolB: '✅', toolC: '❌' },
    { feature: 'Theme Switcher', toolA: '✅', toolB: '❌', toolC: '❌' },
    { feature: 'Gallery Saver', toolA: '✅', toolB: '✅', toolC: '✅' },
    { feature: 'Live Canvas', toolA: '✅', toolB: '❌', toolC: '❌' },
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
      {/* ...existing code above */}

      {/* Comparison Table Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
          Feature Comparison
        </h2>
        <div className="overflow-auto rounded-xl border border-white/10">
          <table className="min-w-full text-left text-sm bg-white/5 backdrop-blur-xl">
            <thead className="text-white/80 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Feature</th>
                <th className="px-6 py-4">SmartTool A</th>
                <th className="px-6 py-4">SmartTool B</th>
                <th className="px-6 py-4">SmartTool C</th>
              </tr>
            </thead>
            <tbody className="text-white/70">
              {comparisonData.map((row, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-white/10 transition ${idx % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}`}
                >
                  <td className="px-6 py-4 font-medium text-white">{row.feature}</td>
                  <td className="px-6 py-4">{row.toolA}</td>
                  <td className="px-6 py-4">{row.toolB}</td>
                  <td className="px-6 py-4">{row.toolC}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ...existing footer */}
    </div>
  );
};

export default SearchPage;
