import express from "express";
import serverless from "serverless-http";
import gatewayRoutes from "../src/routes/auth.gateway.Routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Gateway Service is running 🚀");
});

app.get("/health", (req, res) => {
  res.json({ status: "API Gateway is running" });
});

app.use("/api/auth", gatewayRoutes);

export default serverless(app);
