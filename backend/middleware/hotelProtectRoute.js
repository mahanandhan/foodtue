import jwt from 'jsonwebtoken';
import Hotel from '../models/hotel.model.js';

export const hotelProtectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.hotelJwt;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.HOTEL_JWT_SECRET);
    if (!decoded || !decoded.email) return res.status(401).json({ message: 'Unauthorized' });

    const hotelOwner = await Hotel.findOne({ email: decoded.email });
    if (!hotelOwner) return res.status(404).json({ message: 'Hotel not found' });

    req.hotelOwner = hotelOwner; // attach to request
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
