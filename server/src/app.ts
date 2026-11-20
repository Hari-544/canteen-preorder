import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import authRoutes from "./routes/auth.routes";
import menuRoutes from "./routes/menu.routes";
import orderRoutes from "./routes/orders.routes";
import learningRoutes from "./routes/learning.routes";

const app = express();

// Render and other reverse proxies terminate HTTPS before forwarding requests.
app.set("trust proxy", 1);

const allowedOrigins = (process.env.CLIENT_URL ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

const isProduction = process.env.NODE_ENV === "production";
const sessionSecret = process.env.SESSION_SECRET;

if (isProduction && !sessionSecret) {
  throw new Error("SESSION_SECRET must be configured in production.");
}

app.use(cors({
  origin(origin, callback) {
    // Requests without an Origin header (health checks and server-to-server calls) are allowed.
    if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
      callback(null, true);
      return;
    }
    callback(new Error("Origin is not allowed by CORS."));
  },
  credentials: true
}));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  name: "canteen.sid",
  secret: sessionSecret ?? "development-only-change-this-secret",
  resave: false,
  saveUninitialized: false,
  store: process.env.MONGODB_URI
    ? MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: "sessions"
      })
    : undefined,
  cookie: {
    httpOnly: true,
    // Vercel and Render are different sites, so production session cookies
    // must be sent cross-site. HTTPS is required when SameSite=None is used.
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "canteen-preorder-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/learning", learningRoutes);

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong. Please try again." });
});

export default app;
