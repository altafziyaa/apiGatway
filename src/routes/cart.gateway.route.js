import express from "express";
import axios from "axios";
import services from "../config/services.js";

const router = express.Router();

const getAuthHeader = (req) => ({
  authorization: req.headers.authorization || "",
});

router.post("/addcart", async (req, res) => {
  try {
    const response = await axios.post(
      `${services.CART_SERVICE}/api/cart/addcart`,
      req.body,
      {
        headers: getAuthHeader(req),
      },
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Cart service error" });
  }
});

router.patch("/quantity", async (req, res) => {
  try {
    const response = await axios.patch(
      `${services.CART_SERVICE}/api/cart/quantity`,
      req.body,
      {
        headers: getAuthHeader(req),
      },
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Cart service error" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const response = await axios.delete(
      `${services.CART_SERVICE}/api/cart/delete`,
      {
        headers: getAuthHeader(req),
        data: req.body, // ✅ axios delete body support
      },
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Cart service error" });
  }
});

router.delete("/clear", async (req, res) => {
  try {
    const response = await axios.delete(
      `${services.CART_SERVICE}/api/cart/clear`,
      {
        headers: getAuthHeader(req),
      },
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Cart service error" });
  }
});

export default router;
