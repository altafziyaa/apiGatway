import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import gatewayRoutes from "./src/routes/auth.gateway.Routes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Gateway Service is running 🚀");
});

app.use("/api/auth", gatewayRoutes);

export default app; // 🔥 Vercel requirement
