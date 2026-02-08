import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Github, Chrome, ShieldCheck } from 'lucide-react';
import axios from 'axios';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/signup', // your backend signup endpoint
        {
          username: formData.fullName,
          email: formData.email,
          mobile: formData.phone,
          password: formData.password
        },
        { withCredentials: true } // ensures JWT cookie is set
      );
      console.log('Signup successful:', response.data);
      alert(`Welcome, ${response.data.username}!`);
      // Optionally, redirect to login or dashboard page here
    } catch (error) {
      console.error('Signup error:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FDFDFD] flex items-center justify-center p-4 font-sans text-gray-900">
      {/* Background decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-10%] w-[50%] h-[50%] bg-[#12A0B1]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-5%] right-[-10%] w-[50%] h-[50%] bg-[#12A0B1]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-xl bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-50 p-8 md:p-14 z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Logo and Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-[#12A0B1] rounded-[22px] flex items-center justify-center text-white font-bold text-3xl transform -rotate-3 shadow-xl shadow-[#12A0B1]/20 mb-8">
            F
          </div>
          <h1 className="text-4xl font-black tracking-tight text-gray-800 mb-3">Join Foodtue</h1>
          <p className="text-gray-400 font-medium max-w-xs">Create an account and start discovering the best food in Nellore.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#12A0B1] transition-colors">
                  <User size={18} />
                </div>
                <input
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-gray-50/50 border border-gray-100 text-gray-700 text-sm rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#12A0B1] focus:bg-white transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Phone Number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#12A0B1] transition-colors">
                  <Phone size={18} />
                </div>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-50/50 border border-gray-100 text-gray-700 text-sm rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#12A0B1] focus:bg-white transition-all"
                  placeholder="+91 00000 00000"
                  required
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#12A0B1] transition-colors">
                <Mail size={18} />
              </div>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-50/50 border border-gray-100 text-gray-700 text-sm rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#12A0B1] focus:bg-white transition-all"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Create Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#12A0B1] transition-colors">
                <Lock size={18} />
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-50/50 border border-gray-100 text-gray-700 text-sm rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-[#12A0B1] focus:bg-white transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-300 hover:text-gray-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-[10px] text-gray-400 ml-1 flex items-center gap-1 font-medium">
              <ShieldCheck size={12} className="text-[#12A0B1]" /> Must be at least 8 characters
            </p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#12A0B1] text-white font-bold py-5 rounded-[20px] shadow-xl shadow-[#12A0B1]/20 hover:bg-[#0e8a99] hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 group"
            >
              Create Free Account
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>

        {/* Social Logins */}
        <div className="relative my-10 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <span className="relative bg-white px-6 text-[11px] font-black text-gray-300 uppercase tracking-[0.3em]">Quick Sign up</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 hover:border-gray-200 transition-all font-bold text-sm text-gray-600">
            <Chrome size={20} /> Google
          </button>
          <button className="flex items-center justify-center gap-2 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 hover:border-gray-200 transition-all font-bold text-sm text-gray-600">
            <Github size={20} /> Github
          </button>
        </div>

        {/* Footer Link */}
        <p className="mt-12 text-center text-sm text-gray-400 font-medium">
          Already a member? {' '}
          <button className="text-[#12A0B1] font-black hover:underline underline-offset-8 transition-all">Sign In</button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
