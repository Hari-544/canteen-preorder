import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/User";

async function main() {
  const email = process.argv[2]?.trim().toLowerCase();
  if (!email) {
    console.error("Usage: npm run make-admin -- student@example.com");
    process.exitCode = 1;
    return;
  }
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing from server/.env");
  await mongoose.connect(process.env.MONGODB_URI);
  try {
    const user = await User.findOneAndUpdate({ email }, { $set: { role: "admin" } }, { new: true, runValidators: true }).select("name email role");
    if (!user) {
      console.error("No account found for " + email + ". Register that account in the app first, then run this command again.");
      process.exitCode = 1;
      return;
    }
    console.log("Administrator access enabled for " + user.name + " (" + user.email + ").");
    console.log("Sign in through the normal Sign in page using this account existing password.");
  } finally { await mongoose.disconnect(); }
}
main().catch(async error => { console.error(error); await mongoose.disconnect().catch(() => undefined); process.exitCode = 1; });