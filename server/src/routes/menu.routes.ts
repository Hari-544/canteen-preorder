import { Router } from "express";
import MenuItem from "../models/MenuItem";
import { requireAdmin } from "../middleware/auth";

const router = Router();
router.get("/", async (_req, res, next) => {
  try { res.json(await MenuItem.find({ available: true }).sort({ category: 1, name: 1 })); }
  catch (error) { next(error); }
});
router.post("/", requireAdmin, async (req, res, next) => {
  try { res.status(201).json(await MenuItem.create(req.body)); }
  catch (error) { next(error); }
});
router.patch("/:id", requireAdmin, async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) { res.status(404).json({ message: "Menu item not found." }); return; }
    res.json(item);
  } catch (error) { next(error); }
});
router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) { res.status(404).json({ message: "Menu item not found." }); return; }
    res.status(204).end();
  } catch (error) { next(error); }
});
export default router;