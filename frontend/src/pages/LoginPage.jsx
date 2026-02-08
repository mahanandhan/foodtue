import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github, Chrome } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'https://foodtue.onrender.com/api/auth/login', // ✅ local
        { email, password },
        { withCredentials: true } // send cookies
      );

      console.log('Login success:', response.data);
      navigate('/chat'); // redirect to chat
    } catch (err) {
      console.error('Login error:', err);
      if (err.response?.data?.message) setError(err.response.data.message);
      else setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FDFDFD] flex items-center justify-center p-4 font-sans text-gray-900">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#12A0B1]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#12A0B1]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl shadow-gray-200/50 border border-gray-50 p-8 md:p-12 z-10 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <div className="inline-flex w-14 h-14 bg-[#12A0B1] rounded-2xl items-center justify-center text-white font-bold text-2xl transform rotate-6 shadow-lg shadow-[#12A0B1]/20 mb-6">F</div>
          <h1 className="text-3xl font-black tracking-tight text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-400 font-medium">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#12A0B1] transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 text-gray-700 text-sm rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#12A0B1] focus:bg-white transition-all"
                placeholder="name@company.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Password</label>
              <button type="button" className="text-[11px] font-bold text-[#12A0B1] hover:underline">Forgot password?</button>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#12A0B1] transition-colors">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 text-gray-700 text-sm rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-[#12A0B1] focus:bg-white transition-all"
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
          </div>

          <button
            type="submit"
            className="w-full bg-[#12A0B1] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#12A0B1]/20 hover:bg-[#0e8a99] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
          >
            Sign In
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="relative my-10 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <span className="relative bg-white px-4 text-xs font-bold text-gray-300 uppercase tracking-widest">Or continue with</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-3.5 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm text-gray-600">
            <Chrome size={18} /> Google
          </button>
          <button className="flex items-center justify-center gap-2 py-3.5 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm text-gray-600">
            <Github size={18} /> Github
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-gray-400 font-medium">
          Don't have an account? {' '}
          <button onClick={() => navigate('/signup')} className="text-[#12A0B1] font-bold hover:underline underline-offset-4">Create account</button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
