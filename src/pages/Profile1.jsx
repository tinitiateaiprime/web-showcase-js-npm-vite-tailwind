import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Camera, Edit3, MapPin, Calendar, Globe, 
  Heart, MessageCircle, Share2, Star, Trophy, 
  Zap, Shield, Crown, Sparkles, Eye, Settings,
  Book, Code, Palette, Music, Mountain, Coffee
} from 'lucide-react';

const AdvancedProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Rivera',
    username: '@alexrivera',
    bio: 'Digital artist & creative technologist pushing boundaries between art and code',
    location: 'San Francisco, CA',
    joinDate: 'March 2022',
    website: 'alexrivera.dev',
    followers: 12847,
    following: 892,
    posts: 234
  });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [particleSystem, setParticleSystem] = useState([]);
  const profileRef = useRef(null);

  // Particle system for background effects
  useEffect(() => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: `hsl(${Math.random() * 60 + 200}, 70%, 50%)`
    }));
    setParticleSystem(particles);

    const animateParticles = () => {
      setParticleSystem(prev => 
        prev.map(particle => ({
          ...particle,
          x: (particle.x + particle.speedX + 100) % 100,
          y: (particle.y + particle.speedY + 100) % 100,
          opacity: particle.opacity + (Math.random() - 0.5) * 0.02
        }))
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const skills = [
    { name: 'Digital Art', level: 95, icon: <Palette className="w-4 h-4" /> },
    { name: 'React/Next.js', level: 88, icon: <Code className="w-4 h-4" /> },
    { name: 'UI/UX Design', level: 92, icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Photography', level: 78, icon: <Camera className="w-4 h-4" /> },
    { name: 'Music Production', level: 65, icon: <Music className="w-4 h-4" /> },
    { name: 'Creative Writing', level: 70, icon: <Book className="w-4 h-4" /> }
  ];

  const achievements = [
    { title: 'Digital Pioneer', description: 'First 100 followers', icon: <Crown className="w-5 h-5" />, color: 'text-yellow-400' },
    { title: 'Creative Genius', description: 'Featured artwork', icon: <Trophy className="w-5 h-5" />, color: 'text-purple-400' },
    { title: 'Community Leader', description: '1000+ likes received', icon: <Heart className="w-5 h-5" />, color: 'text-red-400' },
    { title: 'Innovation Award', description: 'Tech breakthrough', icon: <Zap className="w-5 h-5" />, color: 'text-blue-400' },
    { title: 'Verified Creator', description: 'Authenticity confirmed', icon: <Shield className="w-5 h-5" />, color: 'text-green-400' }
  ];

  const recentPosts = [
    { id: 1, title: 'Neural Network Art', likes: 234, comments: 45, image: 'from-purple-600 to-blue-600' },
    { id: 2, title: 'Cyberpunk Cityscape', likes: 189, comments: 32, image: 'from-orange-500 to-red-500' },
    { id: 3, title: 'Abstract Emotions', likes: 156, comments: 28, image: 'from-green-500 to-teal-500' },
    { id: 4, title: 'Digital Metamorphosis', likes: 298, comments: 67, image: 'from-pink-500 to-purple-500' }
  ];

  const stats = [
    { label: 'Profile Views', value: '47.2K', growth: '+12%' },
    { label: 'Engagement Rate', value: '8.4%', growth: '+3%' },
    { label: 'Avg. Likes', value: '2.1K', growth: '+18%' },
    { label: 'Collaborations', value: '23', growth: '+5%' }
  ];

  const tabContent = {
    overview: (
      <div className="space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/60 mb-2">{stat.label}</div>
              <div className="text-xs text-green-400">{stat.growth}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Skills & Expertise
          </h3>
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/80">
                    {skill.icon}
                    <span className="font-medium">{skill.name}</span>
                  </div>
                  <span className="text-sm text-white/60">{skill.level}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className={`${achievement.color}`}>
                  {achievement.icon}
                </div>
                <div>
                  <div className="text-white font-medium">{achievement.title}</div>
                  <div className="text-sm text-white/60">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    posts: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recentPosts.map((post, index) => (
          <div key={post.id} className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 group">
            <div className={`h-48 bg-gradient-to-br ${post.image} relative`}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300" />
              <div className="absolute top-4 right-4">
                <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white">
                  {index + 1}
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">{post.title}</h3>
              <div className="flex items-center gap-4 text-white/60">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{post.comments}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    activity: (
      <div className="space-y-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white font-medium">Activity {index + 1}</div>
                <div className="text-sm text-white/60">{2 + index} hours ago</div>
              </div>
            </div>
            <div className="text-white/80">
              Shared a new artwork that explores the intersection of digital and traditional art forms...
            </div>
          </div>
        ))}
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particleSystem.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full transition-all duration-100"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              transform: `scale(${particle.size})`
            }}
          />
        ))}
      </div>

      {/* Interactive Glow Effect */}
      <div 
        className="fixed w-96 h-96 pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
          transform: `translate3d(0, ${scrollY * 0.1}px, 0)`
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        
        {/* Profile Header */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-8 relative overflow-hidden">
          {/* Header Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500" />
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Profile Picture */}
              <div className="relative group">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold relative overflow-hidden">
                  <User className="w-16 h-16" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300" />
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-1">{profileData.name}</h1>
                    <p className="text-lg text-purple-300">{profileData.username}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white/60 text-sm">Verified Creator</span>
                  </div>
                </div>

                <p className="text-white/80 text-lg max-w-2xl">
                  {profileData.bio}
                </p>

                <div className="flex flex-wrap gap-6 text-white/60">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {profileData.joinDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>{profileData.website}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{profileData.followers.toLocaleString()}</div>
                    <div className="text-sm text-white/60">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{profileData.following.toLocaleString()}</div>
                    <div className="text-sm text-white/60">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{profileData.posts}</div>
                    <div className="text-sm text-white/60">Posts</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-xl font-semibold text-white hover:scale-105 transition-transform shadow-lg">
                  Follow
                </button>
                <button className="bg-white/10 border border-white/20 px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/20 transition-all">
                  Message
                </button>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white/10 border border-white/20 px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10 mb-8">
          <div className="flex gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: <Eye className="w-4 h-4" /> },
              { id: 'posts', label: 'Posts', icon: <Palette className="w-4 h-4" /> },
              { id: 'activity', label: 'Activity', icon: <Zap className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-500 ease-in-out">
          {tabContent[activeTab]}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default AdvancedProfilePage;