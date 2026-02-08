import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, 
  Plus, 
  Minus, 
  MapPin, 
  ChevronRight, 
  Ticket, 
  Receipt, 
  Info,
  Clock,
  MessageSquare
} from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [instructions, setInstructions] = useState("");

  /* ================= FETCH CART ================= */

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        'https://foodtue.onrender.com/api/cart/getcart',
        { withCredentials: true }
      );

      const formattedItems = res.data.items.map(item => ({
        id: item.dishId,
        name: item.dishName,
        price: item.price,
        qty: item.quantity,
        veg: item.veg,
        hotelId: item.hotelId
      }));

      setCartItems(formattedItems);
    } catch (err) {
      console.error('Error fetching cart', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  /* ================= UPDATE QTY ================= */

  const updateQty = async (id, delta) => {
    const item = cartItems.find(i => i.id === id);
    if (!item) return;

    const api =
      delta > 0
        ? 'https://foodtue.onrender.com/api/cart/increment'
        : 'https://foodtue.onrender.com/api/cart/decrement';

    try {
      await axios.post(
        api,
        { hotelId: item.hotelId, dishId: item.id },
        { withCredentials: true }
      );
      fetchCart();
    } catch (err) {
      console.error('Qty update failed', err);
    }
  };

  /* ================= PLACE ORDER ================= */

  const placeOrder = async () => {
    try {
      await axios.post(
        'https://foodtue.onrender.com/api/orders/placeorder',
        {},
        { withCredentials: true }
      );

      setCartItems([]);
      navigate('/orders');
    } catch (err) {
      console.error('Order failed', err);
      alert(err.response?.data?.message || 'Failed to place order');
    }
  };

  /* ================= TOTALS ================= */

  const itemTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const deliveryFee = 35;
  const taxes = Math.round(itemTotal * 0.05);
  const grandTotal = itemTotal + deliveryFee + taxes;

  /* ================= EMPTY CART ================= */

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <Ticket size={48} className="text-gray-200" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">Your cart is empty</h2>
        <p className="text-gray-400 mt-2 font-medium">
          Add some delicious items from the menu to get started!
        </p>
        <button 
          onClick={() => navigate('/chat')}
          className="mt-8 bg-[#12A0B1] text-white px-10 py-4 rounded-2xl font-black shadow-lg active:scale-95 transition-all"
        >
          Explore Restaurants
        </button>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#F8FAFB] pb-40">
      {/* Header */}
      <header className="bg-white sticky top-0 z-30 px-6 py-5 border-b border-gray-100 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
          <ArrowLeft size={20} className="text-gray-800" />
        </button>
        <div>
          <h1 className="text-xl font-black text-gray-900 leading-tight">Checkout</h1>
          <p className="text-[10px] text-[#12A0B1] font-bold uppercase tracking-widest">
            Nellore Spice Grand
          </p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Delivery Address */}
        <div className="bg-white rounded-[28px] p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-orange-50 p-3 rounded-2xl text-orange-600">
              <MapPin size={22} />
            </div>
            <div>
              <h3 className="font-black text-gray-900 text-sm">Delivering to Home</h3>
              <p className="text-xs text-gray-400 font-medium line-clamp-1 mt-0.5">
                12/452, VRC Centre, Nellore, AP
              </p>
            </div>
          </div>
          <button className="text-[#12A0B1] font-black text-xs uppercase tracking-widest">
            Change
          </button>
        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm">
          <div className="p-6">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
              <Clock size={14} /> Arriving in 25-30 mins
            </h2>

            <div className="space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 border flex items-center justify-center shrink-0 ${item.veg ? 'border-green-600' : 'border-red-600'}`}>
                      <span className={`w-1 h-1 rounded-full ${item.veg ? 'bg-green-600' : 'bg-red-600'}`} />
                    </span>
                    <span className="font-bold text-gray-800 text-sm">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-gray-50 border border-gray-100 rounded-xl flex items-center p-1">
                      <button onClick={() => updateQty(item.id, -1)} className="p-1.5 hover:bg-white rounded-lg transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-xs font-black text-gray-700">
                        {item.qty}
                      </span>
                      <button onClick={() => updateQty(item.id, 1)} className="p-1.5 hover:bg-white rounded-lg transition-colors">
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="text-sm font-black text-gray-900 w-12 text-right">
                      ₹{item.price * item.qty}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Cooking Instructions */}
            <div className="mt-8 pt-6 border-t border-dashed border-gray-100">
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-2xl">
                <MessageSquare size={18} />
                <input
                  type="text"
                  placeholder="Any cooking instructions? (e.g. Make it spicy)"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm font-medium w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bill Summary */}
        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex justify-between text-sm font-medium text-gray-500">
            <span>Item Total</span>
            <span>₹{itemTotal}</span>
          </div>
          <div className="flex justify-between text-sm font-medium text-gray-500">
            <span className="flex items-center gap-1.5">
              Delivery Fee <Info size={12} />
            </span>
            <span>₹{deliveryFee}</span>
          </div>
          <div className="flex justify-between text-sm font-medium text-gray-500">
            <span>Taxes & Charges</span>
            <span>₹{taxes}</span>
          </div>
          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-lg font-black text-gray-900">Grand Total</span>
            <span className="text-xl font-black text-gray-900">₹{grandTotal}</span>
          </div>
        </div>
      </main>

      {/* PLACE ORDER BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6 z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#12A0B1]">
              Payable Amount
            </p>
            <h4 className="text-xl font-black text-gray-900">
              ₹{grandTotal}
            </h4>
          </div>

          <button
            onClick={placeOrder}
            className="bg-[#12A0B1] text-white px-8 py-4 rounded-[22px] font-black flex items-center gap-2 shadow-lg shadow-[#12A0B1]/20 active:scale-95 transition-all"
          >
            Place Order <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
