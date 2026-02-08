import express from 'express';
import { placeOrder, getUserOrders } from '../controllers/order.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const orderRouter = express.Router();

orderRouter.use(protectRoute); // User must be logged in

orderRouter.post('/placeorder', placeOrder);
orderRouter.get('/myorders', getUserOrders);

export default orderRouter;
