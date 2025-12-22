import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Zap, Shield, CheckCircle } from 'lucide-react';

export default function UniqueLogin() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeField, setActiveField] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  const handleLogin = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login attempted:', credentials);
    }, 2000);
  };

  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            backgroundColor: i % 3 === 0 ? '#34d399' : i % 3 === 1 ? '#06b6d4' : '#f59e0b',
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`
          }}
          className="animate-bounce"
        />
      ))}
    </div>
  );

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
      <div className="w-4 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-4 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );

  return (
    <div 
      className="min-h-screen bg-gradient-to-tl from-emerald-900 via-teal-800 to-cyan-900 relative flex items-center justify-center p-4"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background Effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(52, 211, 153, 0.3) 0%, transparent 50%)`
        }}
      />
      
      <FloatingElements />
      
      {/* Geometric Shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 border-2 border-amber-400 rotate-45 opacity-20 animate-spin" style={{ animationDuration: '20s' }}></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-cyan-400 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-emerald-400 transform rotate-12 opacity-15 animate-bounce"></div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Header Section */}
        <div className="text-center mb-12 transform transition-all duration-700 hover:scale-105">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <Zap className="text-white" size={32} />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full animate-ping"></div>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3 tracking-wide">
            Welcome Back
          </h1>
          <p className="text-emerald-200 text-lg">
            Enter your digital sanctuary
          </p>
        </div>

        {/* Main Login Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 transform transition-all duration-500 hover:shadow-emerald-500/20 hover:scale-105">
          <div className="space-y-8">
            {/* Email Field */}
            <div className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${activeField === 'email' ? 'opacity-30' : ''}`}></div>
              <div className="relative">
                <Mail className={`absolute left-4 top-4 transition-all duration-300 ${activeField === 'email' ? 'text-emerald-400 scale-110' : 'text-gray-400'}`} size={22} />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={credentials.email}
                  onChange={handleChange}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => setActiveField('')}
                  className="w-full pl-14 pr-4 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:bg-white/10 transition-all duration-300 text-lg"
                />
                {credentials.email && (
                  <CheckCircle className="absolute right-4 top-4 text-emerald-400 animate-pulse" size={22} />
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${activeField === 'password' ? 'opacity-30' : ''}`}></div>
              <div className="relative">
                <Lock className={`absolute left-4 top-4 transition-all duration-300 ${activeField === 'password' ? 'text-cyan-400 scale-110' : 'text-gray-400'}`} size={22} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={handleChange}
                  onFocus={() => setActiveField('password')}
                  onBlur={() => setActiveField('')}
                  className="w-full pl-14 pr-14 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 text-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-cyan-400 transition-colors duration-200 transform hover:scale-110"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" className="sr-only" />
                <div className="w-5 h-5 bg-white/10 border-2 border-white/20 rounded group-hover:border-emerald-400 transition-colors duration-200"></div>
                <span className="text-emerald-200 group-hover:text-white transition-colors duration-200">Remember me</span>
              </label>
              <button className="text-amber-400 hover:text-amber-300 transition-colors duration-200 font-medium">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 disabled:from-gray-500 disabled:to-gray-600 rounded-2xl text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/30 disabled:cursor-not-allowed"
            >
              {isLoading ? <LoadingSpinner /> : 'Sign In'}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-teal-800 px-4 text-emerald-200 text-sm">or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                <div className="w-5 h-5 bg-red-500 rounded-full"></div>
                <span className="text-white font-medium">Google</span>
              </button>
              <button className="flex items-center justify-center space-x-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                <div className="w-5 h-5 bg-blue-600 rounded-full"></div>
                <span className="text-white font-medium">Facebook</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-emerald-300">
            Don't have an account?{' '}
            <button className="text-amber-400 hover:text-amber-300 font-semibold transition-colors duration-200 hover:underline">
              Create one now
            </button>
          </p>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center mt-6 space-x-2">
          <Shield className="text-emerald-400" size={16} />
          <span className="text-emerald-300 text-sm">256-bit SSL encrypted</span>
        </div>
      </div>
    </div>
  );
}