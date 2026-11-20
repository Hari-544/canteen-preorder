import { Router } from "express";
import Order from "../models/Order";
import MenuItem from "../models/MenuItem";
import User from "../models/User";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

router.post("/", async (req, res, next) => {
  try {
    const { items, pickupSlot, paymentMethod } = req.body as {
      items?: { menuItemId: string; quantity: number }[];
      pickupSlot?: string;
      paymentMethod?: "Pay Now" | "Pay at Pickup";
    };
    if (!items?.length || !pickupSlot) {
      res.status(400).json({ message: "Cart items and pickup slot are required." });
      return;
    }
    const customer = await User.findById(req.session.userId).select("name email phone studentId department yearOfStudy");
    if (!customer) { res.status(401).json({ message: "Please sign in again." }); return; }
    if (!customer.phone?.trim() || !customer.studentId?.trim() || !customer.department?.trim() || !customer.yearOfStudy?.trim()) {
      res.status(400).json({ message: "Please complete your profile (phone, student ID, department and year) before placing an order." });
      return;
    }
    const normalized = [];
    for (const entry of items) {
      if (!Number.isInteger(entry.quantity) || entry.quantity < 1) {
        res.status(400).json({ message: "Item quantities must be positive whole numbers." });
        return;
      }
      const item = await MenuItem.findOne({ _id: entry.menuItemId, available: true });
      if (!item) { res.status(400).json({ message: "A selected menu item is unavailable." }); return; }
      normalized.push({ menuItem: item.id, name: item.name, price: item.price, quantity: entry.quantity });
    }
    const total = normalized.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await Order.create({
      user: req.session.userId,
      customer: {
        name: customer.name, email: customer.email, phone: customer.phone,
        studentId: customer.studentId, department: customer.department, yearOfStudy: customer.yearOfStudy
      },
      items: normalized, pickupSlot, paymentMethod: paymentMethod ?? "Pay at Pickup", total
    });
    res.status(201).json(order);
  } catch (error) { next(error); }
});

router.get("/", async (req, res, next) => {
  try {
    const filter = req.session.role === "admin" ? {} : { user: req.session.userId };
    res.json(await Order.find(filter).populate("user", "name email").sort({ createdAt: -1 }));
  } catch (error) { next(error); }
});

router.patch("/:id/status", requireAdmin, async (req, res, next) => {
  try {
    const { status } = req.body as { status?: string };
    const allowed = ["Placed", "Preparing", "Ready", "Collected", "Cancelled"];
    if (!status || !allowed.includes(status)) { res.status(400).json({ message: "Invalid order status." }); return; }
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!order) { res.status(404).json({ message: "Order not found." }); return; }
    res.json(order);
  } catch (error) { next(error); }
});
export default router;