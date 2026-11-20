import { Schema, model, type InferSchemaType } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  phone: { type: String, trim: true, default: "" },
  studentId: { type: String, trim: true, default: "" },
  department: { type: String, trim: true, default: "" },
  yearOfStudy: { type: String, trim: true, default: "" },
  role: { type: String, enum: ["student", "admin"], default: "student" }
}, { timestamps: true });

export type UserDocument = InferSchemaType<typeof userSchema>;
export default model("User", userSchema);