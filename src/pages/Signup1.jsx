import React, { useState } from 'react';
import { Eye, EyeOff, UserPlus, Mail, Lock } from 'lucide-react';

const AdvancedSignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Signup successful!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex items-center justify-center px-6">
      <div className="w-full max-w-lg bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-2xl">
        <div className="text-center mb-8">
          <UserPlus className="mx-auto w-10 h-10 text-white mb-2" />
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-white/60">Join our creative community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/70 mb-1">Full Name</label>
            <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
              <UserPlus className="text-white w-5 h-5 mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-white placeholder-white/40"
                placeholder="Your full name"
              />
            </div>
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-white/70 mb-1">Email</label>
            <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
              <Mail className="text-white w-5 h-5 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-white placeholder-white/40"
                placeholder="your@email.com"
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-white/70 mb-1">Password</label>
            <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
              <Lock className="text-white w-5 h-5 mr-2" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-white placeholder-white/40"
                placeholder="Create password"
              />
              <button type="button" onClick={togglePasswordVisibility} className="ml-2 text-white/70">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-white/70 mb-1">Confirm Password</label>
            <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
              <Lock className="text-white w-5 h-5 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-white placeholder-white/40"
                placeholder="Repeat password"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white font-bold text-lg hover:scale-105 transition-transform"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdvancedSignupPage;
