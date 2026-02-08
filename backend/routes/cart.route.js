// routes/cart.route.js
import express from 'express';
import { addToCart, decrementCartItem, getCart, incrementCartItem, removeFromCart } from '../controllers/cart.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const cartRouter = express.Router();

cartRouter.use(protectRoute); // All routes need user authentication

cartRouter.post('/addtocart', addToCart);
cartRouter.get('/getcart', getCart);
cartRouter.post('/removecart', removeFromCart);
cartRouter.post('/increment', incrementCartItem);
cartRouter.post('/decrement', decrementCartItem);
export default cartRouter;
