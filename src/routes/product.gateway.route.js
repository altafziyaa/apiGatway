import express from "express";
import axios from "axios";
import services from "../config/services.js";

const router = express.Router();

// ✅ Helper (NOT middleware)
const getAuthHeader = (req) => ({
  authorization: req.headers.authorization || "",
});

/* =======================
   PUBLIC ROUTES
======================= */

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

/* =======================
   PROTECTED ROUTES
======================= */

router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      `${services.PRODUCT_SERVICE}/api/products`,
      req.body,
      {
        headers: getAuthHeader(req), // ✅ FIX
      },
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Product service error" });
  }
});

router.put("/:productId", async (req, res) => {
  try {
    const response = await axios.put(
      `${services.PRODUCT_SERVICE}/api/products/${req.params.productId}`,
      req.body,
      {
        headers: getAuthHeader(req), // ✅ FIX
      },
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Product service error" });
  }
});

router.delete("/:productId", async (req, res) => {
  try {
    const response = await axios.delete(
      `${services.PRODUCT_SERVICE}/api/products/${req.params.productId}`,
      {
        headers: getAuthHeader(req), // ✅ FIX
      },
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Product service error" });
  }
});

router.patch("/:productId/restore", async (req, res) => {
  try {
    const response = await axios.patch(
      `${services.PRODUCT_SERVICE}/api/products/${req.params.productId}/restore`,
      {},
      {
        headers: getAuthHeader(req), // ✅ FIX
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
