import express from "express";
import axios from "axios";
import services from "../config/services.js";
import { verifyJwt } from "../middleware/authMiddleware.js";

const router = express.Router();
const getAuthHeader = (req) => ({
  authorization: req.headers.authorization || "",
});

router.get("/", async (req, res) => {
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

router.get("/:productId", async (req, res) => {
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

router.post("/", getAuthHeader, async (req, res) => {
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

router.put("/:productId", getAuthHeader, async (req, res) => {
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

router.delete("/:productId", getAuthHeader, async (req, res) => {
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

router.patch("/:productId/restore", getAuthHeader, async (req, res) => {
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
