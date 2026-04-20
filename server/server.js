import app from "./app.js";
import dotenv from "dotenv";
import mongoose, { Error } from "mongoose";
import dns from "node:dns/promises";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const port = process.env.PORT || 5001;

// MongoDB connection
mongoose
  .connect(
    process.env.MONGODB_URI.replace(
      "<DB_PASSWORD>",
      process.env.DATABASE_PASSWORD,
    ),
  )
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((error) => console.error("MongoDB Connection Error:", error.message));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
