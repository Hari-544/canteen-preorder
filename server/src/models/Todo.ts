import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

export default model("Todo", todoSchema);