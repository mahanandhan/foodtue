// models/cart.model.js
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  dishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel.dishes', required: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  quantity: { type: Number, default: 1 }
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth', required: true },
  items: [cartItemSchema]
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);
