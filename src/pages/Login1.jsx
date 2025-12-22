import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, Shield, 
  Sparkles, Star, Chrome, Github, Apple, 
  Fingerprint, Zap, Globe, Coffee, Heart
} from 'lucide-react';

const AdvancedLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [focusedField, setFocusedField] = useState('');
  const [floatingElements, setFloatingElements] = useState([]);
  const [ripples, setRipples] = useState([]);
  const containerRef = useRef(null);

  // Initialize floating elements
  useEffect(() => {
    const elements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.3 + 0.1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2
    }));
    setFloatingElements(elements);
  }, []);

  // Animate floating elements
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingElements(prev => 
        prev.map(el => ({
          ...el,
          x: (el.x + el.speedX + 100) % 100,
          y: (el.y + el.speedY + 100) % 100,
          rotation: (el.rotation + el.rotationSpeed) % 360,
          opacity: el.opacity + (Math.random() - 0.5) * 0.01
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Create ripple effect
  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ripple = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    setRipples(prev => [...prev, ripple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== ripple.id));
    }, 600);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    console.log('Login submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const socialProviders = [
    { name: 'Google', icon: <Chrome className="w-5 h-5" />, color: 'from-red-500 to-orange-500' },
    { name: 'GitHub', icon: <Github className="w-5 h-5" />, color: 'from-gray-700 to-gray-900' },
    { name: 'Apple', icon: <Apple className="w-5 h-5" />, color: 'from-gray-600 to-black' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute transition-all duration-75 ease-linear"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              transform: `rotate(${element.rotation}deg) scale(${element.size / 8})`,
              opacity: element.opacity
            }}
          >
            <div className="w-3 h-3 bg-gradient-to-br from-white to-purple-200 rounded-full blur-sm" />
          </div>
        ))}
      </div>

      {/* Dynamic Gradient Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none transition-all duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(147, 51, 234, 0.15), transparent 50%)`
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          
          {/* Logo/Brand Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 relative overflow-hidden">
              <Sparkles className="w-8 h-8 text-white z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-lg text-white/70">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <div 
            ref={containerRef}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden"
          >
            {/* Ripple Effects */}
            {ripples.map((ripple) => (
              <div
                key={ripple.id}
                className="absolute rounded-full bg-white/20 pointer-events-none animate-ping"
                style={{
                  left: ripple.x - 20,
                  top: ripple.y - 20,
                  width: 40,
                  height: 40,
                  animation: 'ripple 0.6s ease-out'
                }}
              />
            ))}

            {/* Animated Border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 p-[1px] animate-pulse">
              <div className="w-full h-full bg-transparent rounded-3xl" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Email Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    className="w-full px-4 py-4 pl-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                    placeholder="Enter your email"
                    required
                  />
                  <Mail className={`absolute left-4 top-4 w-5 h-5 transition-colors duration-300 ${
                    focusedField === 'email' ? 'text-purple-400' : 'text-white/50'
                  }`} />
                  {focusedField === 'email' && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 pointer-events-none animate-pulse" />
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    className="w-full px-4 py-4 pl-12 pr-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                    placeholder="Enter your password"
                    required
                  />
                  <Lock className={`absolute left-4 top-4 w-5 h-5 transition-colors duration-300 ${
                    focusedField === 'password' ? 'text-purple-400' : 'text-white/50'
                  }`} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-white/50 hover:text-purple-400 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  {focusedField === 'password' && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 pointer-events-none animate-pulse" />
                  )}
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-purple-500 bg-white/10 border border-white/20 rounded focus:ring-purple-400 focus:ring-2"
                  />
                  <span className="text-sm text-white/70">Remember me</span>
                </label>
                <a href="#" className="text-sm text-purple-300 hover:text-purple-200 transition-colors duration-300">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                onClick={createRipple}
                className="w-full relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-center space-x-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </div>
                
                {/* Button Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-transparent px-4 text-white/60">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-3">
              {socialProviders.map((provider, index) => (
                <button
                  key={provider.name}
                  onClick={createRipple}
                  className={`relative overflow-hidden p-4 bg-gradient-to-br ${provider.color} rounded-xl text-white hover:scale-105 transition-all duration-300 group`}
                >
                  <div className="flex items-center justify-center">
                    {provider.icon}
                  </div>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
            </div>

            {/* Biometric Login */}
            <button
              onClick={createRipple}
              className="w-full mt-4 relative overflow-hidden bg-white/5 border border-white/20 text-white py-3 rounded-xl font-medium hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center justify-center space-x-2">
                <Fingerprint className="w-5 h-5 text-green-400" />
                <span>Use Touch ID / Face ID</span>
              </div>
            </button>

            {/* Security Badge */}
            <div className="mt-6 flex items-center justify-center space-x-2 text-white/60">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm">256-bit SSL encrypted</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-white/70">
              Don't have an account?{' '}
              <a href="#" className="text-purple-300 hover:text-purple-200 font-medium transition-colors duration-300">
                Sign up now
              </a>
            </p>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-white/50 text-sm">
            <p>© 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.6;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default AdvancedLoginPage;