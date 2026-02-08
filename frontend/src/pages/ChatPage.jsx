import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ShoppingBag, MapPin, ChevronRight, Utensils, Pizza, Soup, Leaf, Send, Mic, Star, ArrowLeft, Plus, Minus 
} from 'lucide-react';

const CATEGORIES = [
  { name: 'Biryani', icon: <Utensils size={18} />, color: 'bg-orange-50 text-orange-600' },
  { name: 'Meals', icon: <Soup size={18} />, color: 'bg-blue-50 text-blue-600' },
  { name: 'Fast Food', icon: <Pizza size={18} />, color: 'bg-red-50 text-red-600' },
  { name: 'Healthy', icon: <Leaf size={18} />, color: 'bg-green-50 text-green-600' },
];

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({});

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  // Initial bot greeting
  useEffect(() => {
    if (messages.length === 0) {
      const initChat = async () => {
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 1000));
        setMessages([{ id: 1, type: 'bot', text: "Hi! I'm your Foodtue assistant. 👋" }]);
        await new Promise(r => setTimeout(r, 800));
        setMessages(prev => [...prev, { id: 2, type: 'bot', text: "What would you like to eat today in Nellore?" }]);
        setIsTyping(false);
      };
      initChat();
    }
  }, []);

  // Fetch hotels dynamically
  const fetchHotels = async (searchText = '') => {
    try {
      const res = await axios.get('http://localhost:5000/api/hotels/gethotel', {
        params: { search: searchText },
        withCredentials: true
      });
      return res.data;
    } catch (err) {
      console.error('Error fetching hotels:', err);
      return [];
    }
  };

  // Send user message
  const handleSend = async (textOverride = null) => {
    const textToSend = textOverride || inputValue;
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: textToSend }]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(async () => {
      const hotels = await fetchHotels(textToSend);

      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: hotels.length ? "I found these hotels for you in Nellore:" : "Sorry, no hotels found.",
        hotels: hotels
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200);
  };

  // Redirect to ItemPage
  const handleOrderNow = (hotel) => {
    navigate(`/items/${hotel._id}`, { state: { hotel } });
  };

  // Cart update functions
  const updateCart = (itemId, delta) => {
    setCart(prev => {
      const newQty = (prev[itemId] || 0) + delta;
      if (newQty <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQty };
    });
  };

  // Compute cart totals
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-[#FDFDFD] max-w-2xl mx-auto border-x border-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
            <ArrowLeft size={20} className="text-gray-400" />
          </button>
          <div>
            <h1 className="text-lg font-black leading-tight text-gray-800">Foodtue AI</h1>
            <div className="flex items-center gap-1 text-[10px] text-[#12A0B1] font-bold uppercase tracking-widest">
              <MapPin size={10} /> Nellore Delivery
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user && <span className="text-gray-800 font-bold">{user.username}</span>}
          <button className="p-2.5 bg-gray-50 rounded-2xl text-gray-600 relative">
            <ShoppingBag size={20} />
            {totalItems > 0 && <span className="absolute top-2 right-2 w-3 h-3 bg-[#12A0B1] rounded-full border-2 border-white"></span>}
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 px-4 py-6 space-y-6 pb-32">
        {messages.map(msg => (
          <div key={msg.id} className="space-y-4">
            <div className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                msg.type === 'user' ? 'bg-[#12A0B1] text-white rounded-tr-none font-medium' : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
              }`}>
                {msg.text}
              </div>
            </div>

            {msg.hotels && (
              <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {msg.hotels.map(hotel => (
                  <div key={hotel._id} className="bg-white rounded-[28px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <div className="relative h-40 overflow-hidden">
                      <img src={hotel.image || 'https://via.placeholder.com/400'} className="w-full h-full object-cover" alt={hotel.name} />
                      {hotel.tag && <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-[10px] font-black text-[#12A0B1] uppercase tracking-wider">{hotel.tag}</div>}
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{hotel.name}</h3>
                          <p className="text-gray-400 text-sm">{hotel.cuisine || 'Various Cuisines'}</p>
                        </div>
                        {hotel.rating && <div className="flex items-center gap-1 text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded-lg">{hotel.rating} <Star size={14} fill="currentColor" /></div>}
                      </div>
                      <button 
                        onClick={() => handleOrderNow(hotel)}
                        className="w-full mt-4 bg-[#12A0B1] text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
                      >
                        Order Now <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {!isTyping && messages.length === 2 && (
          <div className="grid grid-cols-2 gap-3 mt-4 animate-in fade-in zoom-in-95 duration-500">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.name} 
                onClick={() => handleSend(cat.name)}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-[#12A0B1] transition-all shadow-sm active:scale-95 text-left"
              >
                <div className={`${cat.color} p-2 rounded-xl shrink-0`}>{cat.icon}</div>
                <span className="font-bold text-gray-700 text-sm">{cat.name}</span>
              </button>
            ))}
          </div>
        )}
      </main>

      {/* Input Section */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/95 to-transparent z-40">
        <div className="max-w-2xl mx-auto flex items-center gap-3 bg-gray-50 rounded-[24px] px-4 py-2 border border-gray-100 focus-within:bg-white focus-within:border-[#12A0B1] transition-all shadow-lg">
          <button className="text-gray-400 hover:text-[#12A0B1] transition-colors"><Mic size={20} /></button>
          <input 
            type="text" 
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)} 
            onKeyPress={e => e.key === 'Enter' && handleSend()} 
            placeholder="Ask for food..." 
            className="bg-transparent border-none focus:ring-0 flex-1 py-3 text-[15px] outline-none text-gray-700 placeholder:text-gray-400" 
          />
          <button 
            onClick={() => handleSend()} 
            disabled={!inputValue.trim()}
            className={`p-3 rounded-2xl transition-all ${inputValue.trim() ? 'bg-[#12A0B1] text-white shadow-lg' : 'bg-gray-200 text-white'}`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
