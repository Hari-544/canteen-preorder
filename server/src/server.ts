import "dotenv/config";
import app from "./app";
import { connectDatabase } from "./config/database";

const port = Number(process.env.PORT ?? 5000);
connectDatabase()
  .then(() => app.listen(port, () => console.log(`API listening on http://localhost:${port}`)))
  .catch(error => {
    console.error("Unable to start API:", error);
    process.exit(1);
  });