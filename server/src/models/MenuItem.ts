import { Schema, model } from "mongoose";

const menuItemSchema = new Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  available: { type: Boolean, default: true }
}, { timestamps: true });

export default model("MenuItem", menuItemSchema);