import Order from '../models/order.model.js';
import Hotel from '../models/hotel.model.js';

// Get orders for hotel owner
export const getHotelOrders = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ email: req.hotelOwner.email });
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    const orders = await Order.find({ 'items.hotelId': hotel._id })
      .populate('userId', 'username email mobile') // show user info
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
