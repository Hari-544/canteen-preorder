import type { Request, Response, NextFunction } from "express";
import User from "../models/User";

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.session.userId) {
    res.status(401).json({ message: "Please sign in to continue." });
    return;
  }
  next();
}

// Always verify the role against MongoDB. Session role values can become stale
// when an existing account is promoted or demoted while its session is active.
export async function requireAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.session.userId) {
      res.status(401).json({ message: "Please sign in to continue." });
      return;
    }
    const user = await User.findById(req.session.userId).select("role");
    if (!user || user.role !== "admin") {
      res.status(403).json({ message: "Administrator access required. Sign in with an administrator account." });
      return;
    }
    req.session.role = "admin";
    next();
  } catch (error) {
    next(error);
  }
}
