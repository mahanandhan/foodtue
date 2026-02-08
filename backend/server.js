import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import router from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import hotelrouter from './routes/hotel.route.js';
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/order.route.js';
import hotelOrderRouter from './routes/hotelOrder.route.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    'http://localhost:5173',
  ],
  credentials: true // allow cookies to be sent
}));
app.get('/', (req, res) => {
  res.send('Hello, Foodtue!');
});

app.use('/api/auth', router)
app.use('/api/hotels', hotelrouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/hotelorders', hotelOrderRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
  console.log(`Server is running on port ${PORT}`);
});