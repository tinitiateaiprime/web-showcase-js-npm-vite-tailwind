import React, { useState, useEffect, useRef } from 'react';
import { Flame, Globe, Star, Code2, Eye, Brain, Zap, Circle, Sparkles, Heart } from 'lucide-react';

const Style2Page = () => {
  const [sparks, setSparks] = useState([]);
  const [highlighted, setHighlighted] = useState(null);
  const [exploreMore, setExploreMore] = useState(false);
  const [mouseTrail, setMouseTrail] = useState([]);
  const [colorThemeIndex, setColorThemeIndex] = useState(0);
  const [likedItems, setLikedItems] = useState({});
  const containerRef = useRef(null);

  const themes = [
    'from-cyan-400 to-blue-600',
    'from-orange-400 to-yellow-500',
    'from-pink-500 to-fuchsia-500',
    'from-teal-500 to-emerald-500'
  ];

  const tools = [
    { id: 1, name: 'Tech Sketch', icon: <Code2 className="w-6 h-6 text-white" /> },
    { id: 2, name: 'Vision Board', icon: <Eye className="w-6 h-6 text-white" /> },
    { id: 3, name: 'Smart Art', icon: <Brain className="w-6 h-6 text-white" /> }
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
      ].slice(-20));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseTrail((trail) => [...trail, { x: e.clientX, y: e.clientY, id: Date.now() }].slice(-20));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const sections = [
    {
      id: 1,
      icon: <Globe className="w-8 h-8 text-white" />, label: "Global Ideas",
      desc: "Innovate with thoughts from every corner of the world."
    },
    {
      id: 2,
      icon: <Flame className="w-8 h-8 text-white" />, label: "Hot Trends",
      desc: "Ride the wave of creativity and new ideas."
    },
    {
      id: 3,
      icon: <Code2 className="w-8 h-8 text-white" />, label: "Tech Artistry",
      desc: "Where coding meets the canvas."
    },
    {
      id: 4,
      icon: <Brain className="w-8 h-8 text-white" />, label: "Smart Design",
      desc: "UI/UX crafted by instinct and insights."
    }
  ];

  const toggleLike = (id) => {
    setLikedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Spark Particles */}
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-70 animate-ping"
          style={{ top: spark.y, left: spark.x }}
        />
      ))}

      {/* Mouse Trail */}
      {mouseTrail.map((trail, index) => (
        <div
          key={trail.id}
          className={`fixed w-2 h-2 bg-gradient-to-r ${themes[colorThemeIndex % themes.length]} rounded-full pointer-events-none z-50`}
          style={{
            left: trail.x - 4,
            top: trail.y - 4,
            opacity: (index + 1) / mouseTrail.length * 0.7,
            transform: `scale(${(index + 1) / mouseTrail.length})`,
            transition: 'all 0.3s ease-out'
          }}
        />
      ))}

      {/* Header */}
      <section className="text-center py-24 px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
          Ignite
        </h1>
        <h2 className="text-3xl md:text-4xl mb-6 text-white/80">
          Passion. Purpose. Possibility.
        </h2>
        <p className="max-w-xl mx-auto text-white/60 text-lg">
          A place where modern minds connect and the future begins with a spark of an idea.
        </p>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {sections.map((sec, i) => (
            <div
              key={sec.id}
              onMouseEnter={() => setHighlighted(i)}
              onMouseLeave={() => setHighlighted(null)}
              className={`p-6 rounded-2xl border border-white/10 transition transform duration-300 hover:scale-105 bg-gradient-to-br ${highlighted === i ? themes[i % themes.length] : 'from-white/10 to-white/5'}`}
            >
              <div className="mb-4 flex justify-between items-center">
                {sec.icon}
                <button onClick={() => toggleLike(sec.id)}>
                  <Heart className={`w-5 h-5 ${likedItems[sec.id] ? 'fill-red-500 text-red-500' : 'text-white/50'}`} />
                </button>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{sec.label}</h3>
              <p className="text-white/70 text-sm">{sec.desc}</p>
            </div>
          ))}
        </div>

        {/* Expandable Content */}
        <div className="text-center mt-12">
          <button
            className="text-white underline hover:text-blue-400 transition"
            onClick={() => setExploreMore(!exploreMore)}
          >
            {exploreMore ? 'Hide Details' : 'Explore More'}
          </button>
          {exploreMore && (
            <div className="mt-6 text-white/70 max-w-3xl mx-auto text-sm">
              <p>
                We aim to bring together diverse creators and technologists to forge the next
                wave of design innovation. Join our weekly creative challenge, attend live
                workshops, and collaborate with mentors globally.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-lime-400 to-green-500 bg-clip-text text-transparent">
          Start Your Fire
        </h2>
        <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
          Join thousands of creators and doers shaping tomorrow.
        </p>
        <button
          onClick={() => setColorThemeIndex((prev) => (prev + 1) % themes.length)}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition"
        >
          <Zap className="inline-block w-5 h-5 mr-2" /> Fuel Creativity
        </button>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-black/30 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            What Our Creators Say
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10">
              <p className="text-white/70 mb-3">
                "A transformative space that let my ideas spark into real projects!"
              </p>
              <span className="text-white font-bold">– Alex, UI Designer</span>
            </div>
            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10">
              <p className="text-white/70 mb-3">
                "The inspiration and support from the community is unmatched."
              </p>
              <span className="text-white font-bold">– Maya, Frontend Engineer</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center border-t border-white/10 bg-white/5">
        <p className="text-white/60">© 2025 Style2 Studio. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Style2Page;
