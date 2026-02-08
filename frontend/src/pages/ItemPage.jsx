import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowLeft,
  Star,
  Clock,
  ChevronRight,
  Search,
  Info,
  Share2,
  Heart
} from 'lucide-react';

const ItemPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  const [hotelData, setHotelData] = useState(state?.hotel || null);
  const [dishes, setDishes] = useState([]);
  const [cartItems, setCartItems] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    const fetchHotel = async () => {
      if (!state?.hotel) {
        const res = await axios.get(
          'http://localhost:5000/api/hotels/gethotel',
          { params: { id }, withCredentials: true }
        );
        setHotelData(res.data[0]);
      }
    };

    const fetchDishes = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/hotels/${id}/dishes`,
        { withCredentials: true }
      );
      setDishes(res.data);
    };

    const fetchCart = async () => {
      const res = await axios.get(
        'http://localhost:5000/api/cart/getcart',
        { withCredentials: true }
      );

      const dishIds = new Set(
        res.data.items.map(item => item.dishId)
      );
      setCartItems(dishIds);
    };

    fetchHotel();
    fetchDishes();
    fetchCart();
  }, [id, state?.hotel]);

  /* ================= CART ================= */

  const addToCart = async (dishId) => {
    try {
      await axios.post(
        'http://localhost:5000/api/cart/addtocart',
        {
          hotelId: hotelData._id,
          dishId,
          quantity: 1
        },
        { withCredentials: true }
      );

      // Update UI instantly
      setCartItems(prev => new Set(prev).add(dishId));
    } catch (err) {
      console.error('Add to cart failed', err);
    }
  };

  if (!hotelData) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  const filteredDishes = dishes.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-white pb-32 animate-in fade-in duration-500">
      {/* Header Image */}
      <div className="relative h-72 md:h-96 w-full">
        <img
          src={hotelData.image || "https://images.unsplash.com/photo-1589302168068-964664d93dc0"}
          alt={hotelData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Actions */}
        <div className="absolute top-6 left-0 right-0 px-6 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg active:scale-90"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-3">
            <button className="p-3 bg-white/90 rounded-2xl shadow-lg">
              <Share2 size={20} />
            </button>
            <button className="p-3 bg-white/90 rounded-2xl shadow-lg">
              <Heart size={20} />
            </button>
          </div>
        </div>

        {/* Hotel Info */}
        <div className="absolute -bottom-6 left-6 right-6 bg-white rounded-[32px] p-6 shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-black">{hotelData.name}</h1>
              <p className="text-gray-400 text-sm">{hotelData.cuisine}</p>
            </div>
            {hotelData.rating && (
              <div className="bg-green-500 text-white px-3 py-1.5 rounded-xl flex items-center gap-1 font-bold text-sm">
                {hotelData.rating} <Star size={14} fill="white" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
              <Clock size={14} /> {hotelData.time || "30-40 min"}
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
              <Info size={14} /> Details
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="mt-12 px-6">
        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search in menu..."
            className="w-full bg-gray-50 rounded-2xl py-4 pl-12 outline-none"
          />
        </div>

        <h2 className="text-xl font-black mb-6">
          Recommended <span className="text-gray-300">({filteredDishes.length})</span>
        </h2>

        <div className="space-y-8">
          {filteredDishes.map(item => (
            <div key={item._id} className="flex gap-4">
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="font-black">₹{item.price}</p>
                <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
              </div>

              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-[24px]"
                />

                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24">
                  {cartItems.has(item._id) ? (
                    <button
                      disabled
                      className="w-full bg-gray-100 text-gray-400 py-2 rounded-xl font-black uppercase text-xs cursor-not-allowed"
                    >
                      Added
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(item._id)}
                      className="w-full bg-white border border-gray-200 text-[#12A0B1] py-2 rounded-xl font-black uppercase text-xs shadow-lg"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
