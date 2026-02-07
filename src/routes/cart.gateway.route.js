import express from "express";
import axios from "axios";
import services from "../config/services.js";

const router = express.Router();

// ✅ Helper (NOT middleware)
const getAuthHeader = (req) => ({
  authorization: req.headers.authorization || "",
});

// ADD ITEM TO CART
router.post("/addcart", async (req, res) => {
  try {
    const response = await axios.post(
      `${services.CART_SERVICE}/api/cart/addcart`,
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
router.put("/quantity/:itemId", async (req, res) => {
  try {
    const response = await axios.put(
      `${services.CART_SERVICE}/api/cart/quantity/${req.params.itemId}`,
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
router.delete("/delete/:itemId", async (req, res) => {
  try {
    const response = await axios.delete(
      `${services.CART_SERVICE}/api/cart/delete/${req.params.itemId}`,
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
router.delete("/clear", async (req, res) => {
  try {
    const response = await axios.delete(
      `${services.CART_SERVICE}/api/cart/clear`,
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

export default router;
