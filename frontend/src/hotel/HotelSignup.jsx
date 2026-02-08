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
  Building2,
  Phone,
  MapPin,
  CheckCircle
} from 'lucide-react';

const HotelSignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // For multi-step feel
  const [formData, setFormData] = useState({
    restaurantName: '',
    email: '',
    phone: '',
    location: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.restaurantName,
        email: formData.email,
        phone: formData.phone,       // optional
        city: formData.location,     // maps to your hotel schema
        password: formData.password
      };

      const res = await axios.post(
        'https://foodtue.onrender.com/api/hotels/signup',
        payload,
        { withCredentials: true } // needed if backend sets auth cookie
      );

      console.log('Signup success:', res.data);
      setStep(3); // show success state
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Something went wrong!');
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
        <div className="w-10" /> 
      </header>

      <main className="flex-1 flex flex-col px-8 pt-6 pb-12 max-w-md mx-auto w-full">
        {step < 3 ? (
          <>
            {/* Hero Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-black text-gray-900 leading-tight">
                Grow with <br />
                <span className="text-[#12A0B1]">Foodtue.</span>
              </h1>
              <p className="text-gray-400 mt-4 font-medium text-sm">
                Join our network of elite restaurants and reach thousands of customers.
              </p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                {/* Restaurant Name */}
                <div className="relative group">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">
                    Restaurant Name
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#12A0B1] transition-colors" size={20} />
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Nellore Spice Grand"
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-[#12A0B1]/20 focus:bg-white rounded-[20px] py-4 pl-12 pr-4 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                      value={formData.restaurantName}
                      onChange={(e) => setFormData({...formData, restaurantName: e.target.value})}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative group">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">
                    Business Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#12A0B1] transition-colors" size={20} />
                    <input 
                      type="email"
                      required
                      placeholder="partnership@yourbrand.com"
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-[#12A0B1]/20 focus:bg-white rounded-[20px] py-4 pl-12 pr-4 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                {/* Phone & Location Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">
                      Contact
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#12A0B1] transition-colors" size={16} />
                      <input 
                        type="tel"
                        required
                        placeholder="Phone"
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-[#12A0B1]/20 focus:bg-white rounded-[20px] py-4 pl-10 pr-4 outline-none transition-all font-bold text-[13px] text-gray-900 placeholder:text-gray-300"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="relative group">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">
                      City
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#12A0B1] transition-colors" size={16} />
                      <input 
                        type="text"
                        required
                        placeholder="Location"
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-[#12A0B1]/20 focus:bg-white rounded-[20px] py-4 pl-10 pr-4 outline-none transition-all font-bold text-[13px] text-gray-900 placeholder:text-gray-300"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="relative group">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">
                    Create Security Key
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#12A0B1] transition-colors" size={20} />
                    <input 
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Min. 8 characters"
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-[#12A0B1]/20 focus:bg-white rounded-[20px] py-4 pl-12 pr-12 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#12A0B1] hover:bg-[#0e8a99] text-white py-4 rounded-[22px] font-black shadow-xl shadow-[#12A0B1]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Register Restaurant <ChevronRight size={20} />
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-[10px] text-gray-400 font-medium px-6 leading-relaxed">
                By registering, you agree to our <span className="underline">Partner Terms</span> and <span className="underline">Data Privacy Policy</span>.
              </p>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-xs font-medium">
                Already a partner? <button onClick={() => navigate('/hotellogin')} className="text-[#12A0B1] font-black uppercase tracking-tighter ml-1">Login</button>
              </p>
            </div>
          </>
        ) : (
          /* SUCCESS STATE */
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8">
              <CheckCircle size={48} className="text-green-500" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Application <br/>Received!</h2>
            <p className="text-gray-500 font-medium text-sm px-4">
              Our onboarding team will review your restaurant details and contact you within 24-48 hours.
            </p>
            <button 
              onClick={() => navigate('/hotellogin')}
              className="mt-10 w-full bg-gray-900 text-white py-4 rounded-[22px] font-black active:scale-[0.98] transition-all"
            >
              Back to Portal
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default HotelSignup;
