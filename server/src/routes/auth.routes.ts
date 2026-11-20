import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body as { name?: string; email?: string; password?: string };
    if (!name?.trim() || !email?.trim() || !password || password.length < 8) {
      res.status(400).json({ message: "Name, email and a password of at least 8 characters are required." });
      return;
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (await User.exists({ email: normalizedEmail })) {
      res.status(409).json({ message: "An account with this email already exists." });
      return;
    }
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: await bcrypt.hash(password, 12)
    });
    req.session.userId = user.id;
    req.session.role = user.role as "student" | "admin";
    res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) { next(error); }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    const user = email ? await User.findOne({ email: email.toLowerCase().trim() }) : null;
    if (!user || !password || !(await bcrypt.compare(password, user.passwordHash))) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }
    req.session.userId = user.id;
    req.session.role = user.role as "student" | "admin";
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) { next(error); }
});

router.get("/me", async (req, res, next) => {
  try {
    if (!req.session.userId) { res.json({ user: null }); return; }
    const user = await User.findById(req.session.userId).select("name email role");
    res.json({ user });
  } catch (error) { next(error); }
});

router.post("/logout", (req, res, next) => {
  req.session.destroy(error => {
    if (error) { next(error); return; }
    res.clearCookie("canteen.sid");
    res.json({ message: "Signed out successfully." });
  });
});

export default router;