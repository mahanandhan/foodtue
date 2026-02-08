import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String
});

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },          // Hotel name
  email: { type: String, required: true, unique: true }, // Hotel login email
  password: { type: String, required: true },      // Hotel password

  city: { type: String, required: true },           // ✅ City (NEW)
  area: { type: String },                           // optional but useful

  image: { type: String },                         // optional

  dishes: [dishSchema]
}, { timestamps: true });

export default mongoose.model('Hotel', hotelSchema);
