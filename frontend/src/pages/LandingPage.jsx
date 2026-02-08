import React from 'react';
import { Search, ShoppingBag, Menu, MapPin, ChevronRight, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-[#FCF9F3] font-sans text-gray-900 overflow-x-hidden">
      {/* Navigation Header */}
      <nav className="flex items-center justify-between px-8 md:px-20 py-6 absolute top-0 w-full z-10">
        <div className="flex items-center gap-12">
          <h1 className="text-2xl font-black tracking-tight text-gray-800">
            Food<span className="text-[#12A0B1]">tue</span>
          </h1>
          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-500">
            <MapPin size={16} className="text-[#12A0B1]" />
            <span>Nellore, Andhra Pradesh</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-8 text-sm font-semibold uppercase tracking-wider text-gray-600">
            {/* <a href="#" className="hover:text-[#12A0B1] transition-colors">Offers</a> */}
            <a href="#" className="hover:text-[#12A0B1] transition-colors">About</a>
            {/* <a href="#" className="hover:text-[#12A0B1] transition-colors">Sign In</a> */}
          </div>
          <button className="bg-white p-2 rounded-full shadow-sm border border-gray-100 relative">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 bg-[#12A0B1] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
          <button className="md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative flex flex-col md:flex-row min-h-screen items-center pt-20 md:pt-0">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 px-8 md:pl-20 md:pr-10 z-10 flex flex-col justify-center animate-in fade-in slide-in-from-left duration-1000">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-[#12A0B1]/20 w-fit mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#12A0B1] animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#12A0B1]">New in Nellore</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-extrabold leading-[1.1] text-gray-800 mb-6">
            Online Food <br />
            <span className="text-[#12A0B1]">Delivery</span>
          </h2>
          
          <p className="text-lg text-gray-500 max-w-md mb-10 leading-relaxed">
            Discover the best flavors from your favorite local restaurants, delivered fresh and fast to your doorstep.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            
            <button onClick={() => navigate('/login')} className="bg-white text-gray-700 border border-gray-200 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all">
              Login
            </button>
            <button onClick={() => navigate('/chat')} className="bg-[#12A0B1] text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-[#12A0B1]/20 hover:bg-[#0e8a99] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group">
              Start Ordering
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          {/* Social Proof/Stats */}
          <div className="mt-16 flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">50+</span>
              <span className="text-xs text-gray-400 uppercase tracking-widest">Restaurants</span>
            </div>
            <div className="h-10 w-[1px] bg-gray-200"></div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold flex items-center gap-1">
                4.9 <Star size={16} fill="#FFB800" className="text-[#FFB800]" />
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-widest">Rating</span>
            </div>
            <div className="h-10 w-[1px] bg-gray-200"></div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold flex items-center gap-1">
                25 <span className="text-sm font-medium text-gray-400">min</span>
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-widest">Avg Delivery</span>
            </div>
          </div>
        </div>

        {/* Visual Content (The Food Bowl) */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative flex items-center justify-center overflow-hidden">
          {/* Background Accent Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 w-[120%] h-[120%] bg-[#12A0B1]/5 rounded-full blur-3xl"></div>
          
          {/* Main Dish Image */}
          <div className="relative z-0 w-full max-w-[600px] h-full flex items-center justify-center animate-in zoom-in duration-1000">
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000" 
              alt="Gourmet Salad Bowl"
              className="w-[85%] md:w-[95%] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] rounded-full hover:rotate-6 transition-transform duration-700"
            />
            
            {/* Floating Order Card */}
            <div className="absolute bottom-20 left-10 md:left-0 bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce-slow">
              <div className="bg-green-100 p-2 rounded-xl">
                <Clock className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Order Now</p>
                <p className="text-sm font-bold text-gray-800">Get Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer/Bottom Bar */}
      <footer className="px-20 py-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs gap-4 bg-white md:bg-transparent">
        <p>© 2024 Foodtue Inc. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-gray-600">Privacy Policy</a>
          <a href="#" className="hover:text-gray-600">Terms of Service</a>
          <a href="#" className="hover:text-gray-600">Cookies</a>
        </div>
      </footer>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default LandingPage;