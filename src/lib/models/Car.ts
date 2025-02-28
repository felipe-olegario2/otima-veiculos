import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  img: { type: String, required: true },
  year: { type: Number, required: true },
  brand: { type: String, required: true },
  description: { type: String },
});

export default mongoose.models.Car || mongoose.model("Car", CarSchema);
