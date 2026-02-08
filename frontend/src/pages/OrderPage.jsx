import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, 
  Package, 
  ChevronRight, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Calendar,
  ShoppingBag,
  Loader2,
  AlertCircle
} from 'lucide-react';

const OrderPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= FETCH ORDERS FROM API ================= */
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://foodtue.onrender.com/api/orders/myorders",
        { withCredentials: true }
      );

      // Transform Backend Data (MongoDB) → UI State
      const formattedOrders = res.data.map(order => {
        // Logic: Is this an active or completed order?
        const isActive = ["Pending", "Preparing", "Out for Delivery", "On the way"].includes(order.status);
        
        return {
          id: order._id ? order._id.slice(-6).toUpperCase() : "ORDER",
          restaurant: order.restaurant || (order.items?.[0]?.name || "Food Order"),
          status: order.status || (isActive ? "On the way" : "Delivered"),
          statusType: isActive ? "active" : "completed",
          date: new Date(order.createdAt).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          }),
          // Flatten items array into strings for display
          items: order.items.map(i => 
            typeof i === 'string' ? i : `${i.name} x ${i.quantity || 1}`
          ),
          total: order.totalPrice || order.total || 0,
          image: order.image || "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=200",
        };
      });

      setOrders(formattedOrders);
      setError(null);
    } catch (err) {
      console.error("API Fetch Error:", err);
      setError("Unable to load your orders. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-10">
      {/* Header */}
      <header className="bg-white sticky top-0 z-30 px-6 py-5 border-b border-gray-100 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-black text-gray-900">My Orders</h1>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-6">
        
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#12A0B1] animate-spin mb-3" />
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Fetching Orders...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-red-50 p-6 rounded-[24px] text-center border border-red-100 mb-6">
            <AlertCircle className="mx-auto text-red-400 mb-2" size={24} />
            <p className="text-sm font-bold text-red-600">{error}</p>
            <button onClick={fetchOrders} className="mt-3 text-xs font-black uppercase text-[#12A0B1] underline">Try Refreshing</button>
          </div>
        )}

        {/* ACTIVE ORDERS */}
        {!loading && orders.some(o => o.statusType === 'active') && (
          <section className="mb-10">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#12A0B1] rounded-full animate-pulse" />
              Active Order
            </h2>
            
            {orders.filter(o => o.statusType === 'active').map(order => (
              <div key={order.id} className="bg-[#12A0B1] rounded-[32px] p-6 text-white shadow-xl shadow-[#12A0B1]/20 overflow-hidden relative group mb-4">
                <ShoppingBag className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-black">{order.restaurant}</h3>
                      <p className="text-white/80 text-xs font-bold uppercase tracking-wider flex items-center gap-1 mt-1">
                        <Clock size={12} /> {order.status}
                      </p>
                    </div>
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      #{order.id}
                    </span>
                  </div>
                  
                  <div className="flex gap-4 items-center mb-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/20">
                      <img src={order.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1">
                      <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-white rounded-full animate-progress-flow" />
                      </div>
                      <p className="text-[10px] mt-2 font-bold uppercase tracking-tighter opacity-80">Estimated Arrival: 15 mins</p>
                    </div>
                  </div>

                  <button className="w-full bg-white text-[#12A0B1] py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg">
                    Track Delivery <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ORDER HISTORY (COMPLETED) */}
        {!loading && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Order History</h2>
            
            <div className="space-y-4">
              {orders.filter(o => o.statusType === 'completed').map(order => (
                <div key={order.id} className="bg-white border border-gray-100 rounded-[28px] p-5 shadow-sm hover:shadow-md transition-all">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                      <img src={order.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-black text-gray-900 leading-none">{order.restaurant}</h3>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1">
                            <Calendar size={10} /> {order.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-black text-gray-900">₹{order.total}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 line-clamp-1 font-medium italic">
                          {order.items.join(", ")}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-green-600">
                          <CheckCircle2 size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Delivered</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">
                            <RotateCcw size={14} /> Reorder
                          </button>
                          <button className="px-4 py-2 bg-white border border-gray-100 text-gray-400 rounded-xl text-[11px] font-black uppercase tracking-widest hover:border-[#12A0B1] hover:text-[#12A0B1] transition-colors">
                            Help
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!loading && orders.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Package size={40} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-black text-gray-800">No orders yet</h3>
            <p className="text-gray-400 mt-2 max-w-[200px] text-sm font-medium">Hungry? Discover the best foods near you!</p>
            <button 
              onClick={() => navigate('/chat')}
              className="mt-8 bg-[#12A0B1] text-white px-8 py-3.5 rounded-2xl font-black shadow-lg shadow-[#12A0B1]/20 active:scale-95 transition-transform"
            >
              Start Ordering
            </button>
          </div>
        )}
      </main>

      {/* Global CSS for the progress animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progress-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-progress-flow {
          background: linear-gradient(90deg, #ffffff 0%, #cdf2f6 50%, #ffffff 100%);
          background-size: 200% 100%;
          animation: progress-flow 2s linear infinite;
        }
      `}} />
    </div>
  );
};

export default OrderPage;