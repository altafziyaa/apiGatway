import express from "express";
import axios from "axios";
import services from "../config/services.js";
import { verifyJwt } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const response = await axios.get(
      `${services.PRODUCT_SERVICE}/api/products`,
      { params: req.query },
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Product service error" });
  }
});

router.get("/products/:productId", async (req, res) => {
  try {
    const response = await axios.get(
      `${services.PRODUCT_SERVICE}/api/products/${req.params.productId}`,
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Product service error" });
  }
});

router.post("/products", verifyJwt, async (req, res) => {
  try {
    const response = await axios.post(
      `${services.PRODUCT_SERVICE}/api/products`,
      req.body,
      {
        headers: {
          authorization: req.headers.authorization,
        },
      },
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Product service error" });
  }
});

router.put("/products/:productId", verifyJwt, async (req, res) => {
  try {
    const response = await axios.put(
      `${services.PRODUCT_SERVICE}/api/products/${req.params.productId}`,
      req.body,
      {
        headers: {
          authorization: req.headers.authorization,
        },
      },
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Product service error" });
  }
});

router.delete("/products/:productId", verifyJwt, async (req, res) => {
  try {
    const response = await axios.delete(
      `${services.PRODUCT_SERVICE}/api/products/${req.params.productId}`,
      {
        headers: {
          authorization: req.headers.authorization,
        },
      },
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Product service error" });
  }
});

router.patch("/products/:productId/restore", verifyJwt, async (req, res) => {
  try {
    const response = await axios.patch(
      `${services.PRODUCT_SERVICE}/api/products/${req.params.productId}/restore`,
      {},
      {
        headers: {
          authorization: req.headers.authorization,
        },
      },
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Product service error" });
  }
});

export default router;
