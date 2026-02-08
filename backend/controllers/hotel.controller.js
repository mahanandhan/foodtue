// controllers/hotel.controller.js

import Hotel from '../models/hotel.model.js';
import bcrypt from 'bcryptjs';
import { generateHotelTokenAndSetCookie } from '../lib/utils/generateHotelToken.js';

/**
 * Hotel Signup
 * Required: name, email, password, city
 * Optional: area, image
 */
export const hotelSignup = async (req, res) => {
  try {
    const { email, password, name, city, area, image } = req.body;

    if (!email || !password || !name || !city) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingHotel = await Hotel.findOne({ email });
    if (existingHotel) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const hotel = new Hotel({
      name,
      email,
      password: hashedPassword,
      city,
      area: area || "",
      image: image || ""
    });

    await hotel.save();

    generateHotelTokenAndSetCookie(email, res);

    res.status(201).json({
      message: 'Hotel registered successfully',
      hotel: { name, email, city, area: area || "", image: image || "" }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Hotel Login
 */
export const hotelLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hotel = await Hotel.findOne({ email });
    if (!hotel) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, hotel.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    generateHotelTokenAndSetCookie(email, res);

    res.status(200).json({
      message: 'Login successful',
      hotel: { name: hotel.name, email, city: hotel.city, area: hotel.area, image: hotel.image }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Add Dish (Hotel Owner Only)
 */
export const addDish = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const { name, price, description, image } = req.body;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    // Assuming req.hotelOwner is set by auth middleware
    if (hotel.email !== req.hotelOwner.email) {
      return res.status(403).json({ message: 'Forbidden: You cannot add dishes to this hotel' });
    }

    hotel.dishes.push({ name, price, description, image });
    await hotel.save();

    res.status(201).json({ message: 'Dish added successfully', dishes: hotel.dishes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Get Hotels (User Facing)
 * Optional Query: ?city=CityName
 */
export const getHotels = async (req, res) => {
  try {
    const { city } = req.query;
    const query = {};

    if (city) {
      query.city = city;
    }

    const hotels = await Hotel.find(query).select('-password');
    res.status(200).json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Get Dishes for a Hotel
 */
export const getDishes = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    res.status(200).json(hotel.dishes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
