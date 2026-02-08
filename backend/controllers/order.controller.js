import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';
import Hotel from '../models/hotel.model.js';

// Place an order
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id; // from protectRoute
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    let totalPrice = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const hotel = await Hotel.findById(item.hotelId);
      if (!hotel) continue;

      const dish = hotel.dishes.id(item.dishId);
      if (!dish) continue;

      orderItems.push({
        hotelId: hotel._id,
        dishId: dish._id,
        name: dish.name,
        price: dish.price,
        quantity: item.quantity,
      });

      totalPrice += dish.price * item.quantity;
    }

    if (orderItems.length === 0) return res.status(400).json({ message: 'No valid items in cart' });

    const order = new Order({ userId, items: orderItems, totalPrice });
    await order.save();

    // Clear cart
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get orders of the current user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
