import { Router } from "express";
import Todo from "../models/Todo";
import QuizQuestion from "../models/QuizQuestion";
import { requireAuth } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

router.get("/todos", async (req, res, next) => {
  try { res.json(await Todo.find({ user: req.session.userId }).sort({ createdAt: -1 })); }
  catch (error) { next(error); }
});
router.post("/todos", async (req, res, next) => {
  try {
    const title = String(req.body.title ?? "").trim();
    if (!title) { res.status(400).json({ message: "Task title is required." }); return; }
    res.status(201).json(await Todo.create({ user: req.session.userId, title }));
  } catch (error) { next(error); }
});
router.patch("/todos/:id", async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.session.userId },
      { completed: Boolean(req.body.completed), ...(req.body.title ? { title: String(req.body.title).trim() } : {}) },
      { new: true, runValidators: true }
    );
    if (!todo) { res.status(404).json({ message: "Task not found." }); return; }
    res.json(todo);
  } catch (error) { next(error); }
});
router.delete("/todos/:id", async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.session.userId });
    if (!todo) { res.status(404).json({ message: "Task not found." }); return; }
    res.status(204).end();
  } catch (error) { next(error); }
});
router.get("/quiz", async (_req, res, next) => {
  try { res.json(await QuizQuestion.find().select("-correctAnswer")); }
  catch (error) { next(error); }
});
router.post("/quiz/submit", async (req, res, next) => {
  try {
    const answers = req.body.answers as Record<string, number> | undefined;
    const questions = await QuizQuestion.find();
    const score = questions.reduce((sum, question) =>
      sum + (answers?.[question.id] === question.correctAnswer ? 1 : 0), 0);
    res.json({ score, total: questions.length });
  } catch (error) { next(error); }
});
export default router;