import express from "express";
import axios from "axios";
import services from "../config/services.js";

const router = express.Router();

const getAuthHeader = (req) => ({
  authorization: req.headers.authorization || "",
});

// GET ALL PRODUCTS (PUBLIC)
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${services.PRODUCT_SERVICE}/api/products`);

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Product service error" });
  }
});

// GET PRODUCT BY ID (PUBLIC)
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

// CREATE PRODUCT (PROTECTED)
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      `${services.PRODUCT_SERVICE}/api/products`,
      req.body,
      {
        headers: getAuthHeader(req),
      },
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Product service error" });
  }
});

// UPDATE PRODUCT (PROTECTED)
router.put("/:productId", async (req, res) => {
  try {
    const response = await axios.put(
      `${services.PRODUCT_SERVICE}/api/products/${req.params.productId}`,
      req.body,
      {
        headers: getAuthHeader(req),
      },
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Product service error" });
  }
});

// DELETE PRODUCT (PROTECTED)
router.delete("/:productId", async (req, res) => {
  try {
    const response = await axios.delete(
      `${services.PRODUCT_SERVICE}/api/products/${req.params.productId}`,
      {
        headers: getAuthHeader(req),
      },
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Product service error" });
  }
});

// RESTORE PRODUCT (PROTECTED)
router.patch("/:productId/restore", async (req, res) => {
  try {
    const response = await axios.patch(
      `${services.PRODUCT_SERVICE}/api/products/${req.params.productId}/restore`,
      req.body,
      {
        headers: getAuthHeader(req),
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
