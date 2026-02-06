import express from "express";
import cors from "cors";

import authGatewayRoutes from "./src/routes/auth.gateway.Routes.js";
import cartGatewayRoutes from "./src/routes/cart.gateway.route.js";
import productGatewayRoutes from "./src/routes/product.gateway.route.js";
import { verifyJwt } from "./src/middleware/authMiddleware.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Gateway Service is running");
});

app.use("/api/auth", verifyJwt, authGatewayRoutes);
app.use("/api/cart", cartGatewayRoutes);
app.use("/api/products", productGatewayRoutes);

app.use((err, req, res, next) => {
  console.error("Gateway Error:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});
export default app;
