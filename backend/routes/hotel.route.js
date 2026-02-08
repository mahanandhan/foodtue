import express from 'express';
import { hotelSignup, hotelLogin, addDish, getHotels, getDishes } from '../controllers/hotel.controller.js';
import { hotelProtectRoute } from '../middleware/hotelProtectRoute.js';

const hotelrouter = express.Router();

// Hotel authentication
hotelrouter.post('/signup', hotelSignup);
hotelrouter.post('/login', hotelLogin);

// Hotels
hotelrouter.get('/gethotel', getHotels);  // static route first

// Dishes
hotelrouter.post('/:hotelId/dishes', hotelProtectRoute, addDish);
hotelrouter.get('/:hotelId/dishes', getDishes);

// Optional: get hotel by ID
// hotelrouter.get('/:hotelId', getHotelById); // you can add a controller for this

export default hotelrouter;
