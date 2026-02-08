import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  dishId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true }, // Dish name snapshot
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth', required: true },
  items: [orderItemSchema],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Preparing', 'Completed', 'Cancelled'], default: 'Pending' },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
