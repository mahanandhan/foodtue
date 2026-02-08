import express from 'express';
import { getHotelOrders } from '../controllers/hotelOrder.controller.js';
import { hotelProtectRoute } from '../middleware/hotelProtectRoute.js';

const hotelOrderRouter = express.Router();

// Only hotel owners can access
hotelOrderRouter.get('/orders', hotelProtectRoute, getHotelOrders);

export default hotelOrderRouter;
