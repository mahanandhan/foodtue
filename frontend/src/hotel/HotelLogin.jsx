import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Lock, 
  Mail, 
  ChevronRight, 
  ChefHat, 
  ArrowLeft,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';

const HotelLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        email: formData.email,
        password: formData.password
      };

      const res = await axios.post(
        'https://foodtue.onrender.com/api/hotels/login',
        payload,
        { withCredentials: true } // necessary if backend sets auth cookie
      );

      console.log('Login success:', res.data);

      // Redirect or store token if needed
      // For example, navigate to dashboard:
      navigate('/hoteldashboard');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
      {/* Top Navigation */}
      <header className="px-6 py-6 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#12A0B1] rounded-lg flex items-center justify-center">
            <ChefHat size={18} className="text-white" />
          </div>
          <span className="font-black text-gray-900 tracking-tight">Partner Portal</span>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </header>

      <main className="flex-1 flex flex-col px-8 pt-10 pb-12 max-w-md mx-auto w-full">
        {/* Hero Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 leading-tight">
            Welcome Back, <br />
            <span className="text-[#12A0B1]">Partner.</span>
          </h1>
          <p className="text-gray-400 mt-4 font-medium text-sm">
            Manage your kitchen, orders, and menu in one place.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Email Input */}
            <div className="relative group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">
                Restaurant Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#12A0B1] transition-colors" size={20} />
                <input 
                  type="email"
                  required
                  placeholder="manager@nellorespice.com"
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#12A0B1]/20 focus:bg-white rounded-[20px] py-4 pl-12 pr-4 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">
                Security Key
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#12A0B1] transition-colors" size={20} />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#12A0B1]/20 focus:bg-white rounded-[20px] py-4 pl-12 pr-12 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs font-black text-[#12A0B1] uppercase tracking-wider hover:opacity-70">
              Forgot Key?
            </button>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#12A0B1] hover:bg-[#0e8a99] text-white py-4 rounded-[22px] font-black shadow-xl shadow-[#12A0B1]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Enter Dashboard <ChevronRight size={20} />
              </>
            )}
          </button>
        </form>

        {/* Footer Info */}
        <div className="mt-auto pt-10 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
            <AlertCircle size={14} className="text-blue-500" />
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Authorized Access Only</span>
          </div>
          <p className="text-gray-400 text-xs font-medium">
            Not a partner yet? <button onClick={() => navigate('/hotel-signup')} className="text-[#12A0B1] font-black uppercase tracking-tighter ml-1">Apply Now</button>
          </p>
        </div>
      </main>
    </div>
  );
};

export default HotelLogin;
