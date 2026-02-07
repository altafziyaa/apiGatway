import express from "express";
import axios from "axios";
import services from "../config/services.js";

const router = express.Router();

const getAuthHeader = (req) => ({
  authorization: req.headers.authorization || "",
});

// GET CART
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${services.CART_SERVICE}/api/cart`, {
      headers: getAuthHeader(req),
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Cart service error" });
  }
});

// ADD ITEM TO CART
router.post("/items", async (req, res) => {
  try {
    const response = await axios.post(
      `${services.CART_SERVICE}/api/cart/items`,
      req.body,
      {
        headers: getAuthHeader(req),
      },
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Cart service error" });
  }
});

// UPDATE ITEM QUANTITY
router.put("/items/:itemId", async (req, res) => {
  try {
    const response = await axios.put(
      `${services.CART_SERVICE}/api/cart/items/${req.params.itemId}`,
      req.body,
      {
        headers: getAuthHeader(req),
      },
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Cart service error" });
  }
});

// REMOVE ITEM FROM CART
router.delete("/items/:itemId", async (req, res) => {
  try {
    const response = await axios.delete(
      `${services.CART_SERVICE}/api/cart/items/${req.params.itemId}`,
      {
        headers: getAuthHeader(req),
      },
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Cart service error" });
  }
});

// CLEAR CART
router.delete("/", async (req, res) => {
  try {
    const response = await axios.delete(`${services.CART_SERVICE}/api/cart`, {
      headers: getAuthHeader(req),
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Cart service error" });
  }
});

export default router;
