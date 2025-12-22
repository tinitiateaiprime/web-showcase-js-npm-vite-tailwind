import React, { useState, useEffect, useRef } from 'react';
import { Palette, Sparkles, Layers, Heart, Moon, Sun, Music, Camera, Brush } from 'lucide-react';

const CreativeArtPage = () => {
  const [mouseTrail, setMouseTrail] = useState([]);
  const [colorPalette, setColorPalette] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [likedArtworks, setLikedArtworks] = useState({});
  const canvasRef = useRef(null);
  const isDarkMode = true;

  const colorThemes = [
    ['from-rose-400 to-orange-300', 'from-pink-500 to-rose-400'],
    ['from-blue-400 to-cyan-300', 'from-indigo-500 to-blue-400'],
    ['from-green-400 to-emerald-300', 'from-teal-500 to-green-400'],
    ['from-purple-400 to-violet-300', 'from-indigo-500 to-purple-400']
  ];

  const artworks = [
    {
      id: 1,
      title: "Digital Dreams",
      category: "Abstract",
      colors: "Vibrant blues and purples",
      description: "A journey through digital consciousness",
      likes: 234
    },
    {
      id: 2,
      title: "Neon Nights",
      category: "Urban",
      colors: "Electric pinks and cyans",
      description: "City lights come alive in pixels",
      likes: 189
    },
    {
      id: 3,
      title: "Organic Flow",
      category: "Nature",
      colors: "Earthy greens and golds",
      description: "Nature meets digital harmony",
      likes: 312
    },
    {
      id: 4,
      title: "Cosmic Waves",
      category: "Space",
      colors: "Deep purples and starlight",
      description: "Exploring the infinite digital cosmos",
      likes: 467
    }
  ];

  const tools = [
    { icon: <Brush className="w-6 h-6" />, name: "Digital Painting", active: true },
    { icon: <Camera className="w-6 h-6" />, name: "Photo Manipulation", active: false },
    { icon: <Music className="w-6 h-6" />, name: "Audio Visual", active: false },
    { icon: <Layers className="w-6 h-6" />, name: "3D Modeling", active: false }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
        return newTrail.slice(-20);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setMouseTrail(prev => prev.filter(point => Date.now() - point.id < 1000));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const handleLike = (artworkId) => {
    setLikedArtworks(prev => ({
      ...prev,
      [artworkId]: !prev[artworkId]
    }));
  };

  const currentTheme = colorThemes[colorPalette];

  return (
    <div className="min-h-screen transition-all duration-1000 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      
      {/* Mouse Trail Effect */}
      {mouseTrail.map((point, index) => (
        <div
          key={point.id}
          className={`fixed w-2 h-2 bg-gradient-to-r ${currentTheme[0]} rounded-full pointer-events-none z-50`}
          style={{
            left: point.x - 4,
            top: point.y - 4,
            opacity: (index + 1) / mouseTrail.length * 0.7,
            transform: `scale(${(index + 1) / mouseTrail.length})`,
            transition: 'all 0.3s ease-out'
          }}
        />
      ))}

      {/* Floating Art Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-16 h-16 bg-gradient-to-r ${currentTheme[i % 2]} rounded-full opacity-10 animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
      </div>

      {/* Hero Creative Space */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-5xl">
          <div className="mb-8">
            <h1 className="text-7xl md:text-9xl font-bold leading-tight mb-6 text-white">
              <span className={`bg-gradient-to-r ${currentTheme[0]} bg-clip-text text-transparent animate-pulse`}>
                Create
              </span>
              <br />
              <span className={`bg-gradient-to-r ${currentTheme[1]} bg-clip-text text-transparent`}>
                Dream
              </span>
              <br />
              <span className="text-white/90">
                Inspire
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/70">
              Where imagination meets digital artistry. Unleash your creativity with infinite possibilities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button
              onClick={() => setIsCreating(!isCreating)}
              className={`group bg-gradient-to-r ${currentTheme[0]} px-10 py-4 rounded-full font-semibold text-lg text-white hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl`}
            >
              <span className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                {isCreating ? 'Creating...' : 'Start Creating'}
              </span>
            </button>
            <button className="group bg-white/10 border-white/20 text-white border backdrop-blur-sm px-10 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-3">
                <Heart className="w-6 h-6 group-hover:fill-current group-hover:text-red-500 transition-colors" />
                Explore Art
              </span>
            </button>
          </div>

          {/* Creative Tools */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="group p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 bg-white/5 border-white/10 hover:bg-white/10"
              >
                <div className={`text-white/80 group-hover:scale-110 transition-transform mb-2 ${tool.active ? 'text-white' : ''}`}>
                  {tool.icon}
                </div>
                <div className={`text-sm font-medium text-white/80 ${tool.active ? 'text-white' : ''}`}>
                  {tool.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Art Gallery */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold mb-6 bg-gradient-to-r ${currentTheme[0]} bg-clip-text text-transparent`}>
              Featured Creations
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-white/70">
              Discover breathtaking digital artworks from our creative community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {artworks.map((artwork, index) => (
              <div
                key={artwork.id}
                className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105 bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className={`h-64 bg-gradient-to-br ${currentTheme[index % 2]} relative`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => handleLike(artwork.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        likedArtworks[artwork.id] 
                          ? `bg-red-500 scale-110` 
                          : `bg-gradient-to-r ${currentTheme[(index + 1) % 2]} hover:scale-110`
                      }`}
                    >
                      <Heart className={`w-4 h-4 text-white ${likedArtworks[artwork.id] ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">
                      {artwork.title}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-white/60" />
                      <span className="text-sm text-white/60">
                        {artwork.likes + (likedArtworks[artwork.id] ? 1 : 0)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm mb-3 text-white/60">
                    {artwork.category} • {artwork.colors}
                  </p>
                  <p className="text-sm text-white/80">
                    {artwork.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Stats */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: "50K+", label: "Artworks Created", icon: <Brush className="w-8 h-8" /> },
              { number: "25K+", label: "Creative Artists", icon: <Palette className="w-8 h-8" /> },
              { number: "100+", label: "Art Styles", icon: <Layers className="w-8 h-8" /> }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${currentTheme[index % 2]} mb-4 group-hover:scale-110 transition-transform`}>
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div className={`text-4xl font-bold bg-gradient-to-r ${currentTheme[index % 2]} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <div className="text-white/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Community */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 text-white">
            Join the <span className={`bg-gradient-to-r ${currentTheme[0]} bg-clip-text text-transparent`}>Creative</span> Revolution
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/70">
            Connect with fellow artists, share your vision, and inspire the world through digital art
          </p>
          <button className={`bg-gradient-to-r ${currentTheme[0]} px-12 py-4 rounded-full font-semibold text-lg text-white hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl`}>
            <span className="flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              Begin Your Journey
            </span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black/40 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/60">
            Crafted with passion for digital creativity and artistic expression
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default CreativeArtPage;