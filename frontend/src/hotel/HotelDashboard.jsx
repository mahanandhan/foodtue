import React, { useEffect, useState } from 'react';
import { ChefHat, Clock, Bell, Search, ShoppingBag, TrendingUp, Timer, Package } from 'lucide-react';
import axios from 'axios';

const HotelDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch hotel orders from backend API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/hotelorders/orders', { withCredentials: true });

        const formattedOrders = res.data.map(order => ({
          id: order._id,
          customer: order.userId?.username || "Customer",
          mobile: order.userId?.mobile || "N/A",
          items: order.items.map(i => `${i.name} x ${i.quantity}`),
          total: order.totalPrice,
          time: new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          status: order.status.charAt(0).toUpperCase() + order.status.slice(1)
        }));

        setOrders(formattedOrders);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Stats calculation
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const prepTime = "15m";
  const activeItems = orders.reduce((sum, o) => sum + o.items.reduce((a, i) => a + i.qty, 0), 0);

  if (loading) return <p className="text-center mt-20 text-gray-500">Loading orders...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-[#F8FAFB] font-sans p-6">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#12A0B1] rounded-xl flex items-center justify-center">
            <ChefHat size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black text-gray-900 leading-tight">Nellore Spice</h1>
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Kitchen Live
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              placeholder="Search Order ID..." 
              className="bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm font-bold focus:ring-2 focus:ring-[#12A0B1]/20 outline-none w-48"
            />
          </div>
          <button className="relative p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
        </div>
      </header>

      {/* Stats Summary */}
      <div className="px-0 py-6 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1600px] w-full mx-auto">
        <StatCard label="Total Orders" value={totalOrders} trend="+12%" icon={<ShoppingBag size={18}/>} color="blue" />
        <StatCard label="Live Revenue" value={`₹${totalRevenue}`} trend="+8.4%" icon={<TrendingUp size={18}/>} color="green" />
        <StatCard label="Prep Time" value={prepTime} trend="-2m" icon={<Timer size={18}/>} color="orange" />
        <StatCard label="Active Items" value={activeItems} trend="0" icon={<Package size={18}/>} color="teal" />
      </div>

      {/* Orders List */}
      <div className="space-y-4 mt-6 max-w-[1600px] w-full mx-auto">
        {orders.length === 0 && <p className="text-gray-500 text-center mt-20">No orders yet</p>}

        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

// Stats Card
const StatCard = ({ label, value, trend, icon, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-500",
    green: "bg-green-50 text-green-500",
    orange: "bg-orange-50 text-orange-500",
    teal: "bg-teal-50 text-teal-500",
  };
  return (
    <div className="bg-white p-5 rounded-[24px] border border-gray-100 flex items-center justify-between group hover:shadow-lg transition-all">
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <h3 className="text-xl font-black text-gray-900">{value}</h3>
        <p className="text-[10px] font-bold text-green-500 mt-1">{trend}</p>
      </div>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors[color] || colors.blue} transition-transform group-hover:scale-110`}>
        {icon}
      </div>
    </div>
  );
};

// Order Card
const OrderCard = ({ order }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-4 flex justify-between items-center shadow-sm hover:shadow-md transition-all">
    <div>
      <h3 className="text-sm font-black text-gray-900">{order.customer}</h3>
      <p className="text-gray-500 text-xs">{order.mobile}</p>
      <p className="text-gray-600 text-xs mt-1 italic">{order.items.join(", ")}</p>
      <p className="text-gray-900 font-bold mt-1">₹{order.total}</p>
    </div>
    <div className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
      order.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
      order.status === "Preparing" ? "bg-blue-100 text-blue-700" :
      "bg-green-100 text-green-700"
    }`}>
      {order.status}
    </div>
  </div>
);

export default HotelDashboard;
