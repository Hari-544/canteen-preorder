import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    studentId: { type: String, default: "" },
    department: { type: String, default: "" },
    yearOfStudy: { type: String, default: "" }
  },
  items: [{
    menuItem: { type: Schema.Types.ObjectId, ref: "MenuItem" },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 }
  }],
  pickupSlot: { type: String, required: true },
  paymentMethod: { type: String, enum: ["Pay Now", "Pay at Pickup"], default: "Pay at Pickup" },
  status: { type: String, enum: ["Placed", "Preparing", "Ready", "Collected", "Cancelled"], default: "Placed" },
  total: { type: Number, required: true, min: 0 }
}, { timestamps: true });

export default model("Order", orderSchema);