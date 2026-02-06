import express from "express";
import gatewayRoutes from "./src/routes/auth.gateway.Routes.js";
const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "API Gateway is running" });
});

app.use("/api/auth", gatewayRoutes);
app.get("/", (req, res) => {
  res.send("api gateway Service is running 🚀");
});
