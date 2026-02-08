// controllers/cart.controller.js
import Cart from '../models/cart.model.js';
import Hotel from '../models/hotel.model.js';

// Add a dish to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id; // from protectRoute
    const { hotelId, dishId, quantity } = req.body;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    const dish = hotel.dishes.id(dishId);
    if (!dish) return res.status(404).json({ message: 'Dish not found' });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ hotelId, dishId, quantity }] });
    } else {
      // check if dish already in cart
      const existingItem = cart.items.find(
        item => item.dishId.toString() === dishId && item.hotelId.toString() === hotelId
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ hotelId, dishId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(200).json({ items: [] });

    // Manually populate dish and hotel info
    const populatedItems = await Promise.all(
      cart.items.map(async item => {
        const hotel = await Hotel.findById(item.hotelId);
        if (!hotel) return null;

        const dish = hotel.dishes.id(item.dishId);
        if (!dish) return null;

        return {
          hotelId: hotel._id,
          hotelName: hotel.name,
          dishId: dish._id,
          dishName: dish.name,
          price: dish.price,
          quantity: item.quantity
        };
      })
    );

    res.status(200).json({ items: populatedItems.filter(i => i !== null) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Remove item or decrease quantity
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { dishId, hotelId } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(
      item => !(item.dishId.toString() === dishId && item.hotelId.toString() === hotelId)
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const incrementCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { hotelId, dishId } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(
      i => i.dishId.toString() === dishId && i.hotelId.toString() === hotelId
    );

    if (item) {
      item.quantity += 1;
    } else {
      cart.items.push({ hotelId, dishId, quantity: 1 });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const decrementCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { hotelId, dishId } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(
      i => i.dishId.toString() === dishId && i.hotelId.toString() === hotelId
    );

    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart.items = cart.items.filter(
          i => !(i.dishId.toString() === dishId && i.hotelId.toString() === hotelId)
        );
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
