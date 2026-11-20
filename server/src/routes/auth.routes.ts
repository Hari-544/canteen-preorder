import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { requireAuth } from "../middleware/auth";

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
    const user = await User.findById(req.session.userId).select("name email role phone studentId department yearOfStudy");
    res.json({ user });
  } catch (error) { next(error); }
});

router.patch("/profile", requireAuth, async (req, res, next) => {
  try {
    const { name, email, phone, studentId, department, yearOfStudy } = req.body as {
      name?: string; email?: string; phone?: string; studentId?: string;
      department?: string; yearOfStudy?: string;
    };
    if (!name?.trim() || !email?.trim()) {
      res.status(400).json({ message: "Name and email are required." });
      return;
    }
    const normalizedEmail = email.trim().toLowerCase();
    const duplicate = await User.exists({ email: normalizedEmail, _id: { $ne: req.session.userId } });
    if (duplicate) {
      res.status(409).json({ message: "That email address is already used by another account." });
      return;
    }
    const user = await User.findByIdAndUpdate(req.session.userId, {
      $set: {
        name: name.trim(), email: normalizedEmail,
        phone: (phone ?? "").trim(), studentId: (studentId ?? "").trim(),
        department: (department ?? "").trim(), yearOfStudy: (yearOfStudy ?? "").trim()
      }
    }, { new: true, runValidators: true }).select("name email role phone studentId department yearOfStudy");
    if (!user) { res.status(404).json({ message: "Account not found." }); return; }
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