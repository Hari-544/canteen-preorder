import { Schema, model } from "mongoose";

const quizQuestionSchema = new Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true, validate: (v: string[]) => v.length >= 2 },
  correctAnswer: { type: Number, required: true, min: 0 }
}, { timestamps: true });

export default model("QuizQuestion", quizQuestionSchema);