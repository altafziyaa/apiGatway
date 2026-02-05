import express from "express";
import axios from "axios";
import services from "../config/services.js";

const router = express.Router();

const getAuthHeader = (req) => ({
  authorization: req.headers.authorization || "",
});

router.post("/signup", async (req, res) => {
  try {
    console.log("➡️ Gateway → Auth Signup:", services.AUTH_SERVICE);

    const response = await axios.post(
      `${services.AUTH_SERVICE}/api/auth/signup`,
      req.body,
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("❌ Signup error:", error.message);
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Auth service error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("Gateway → Auth Login:", services.AUTH_SERVICE);

    const response = await axios.post(
      `${services.AUTH_SERVICE}/api/auth/login`,
      req.body,
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("❌ Login error:", error.message);
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Auth service error" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const response = await axios.post(
      `${services.AUTH_SERVICE}/api/auth/logout`,
      {},
      { headers: getAuthHeader(req) },
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("❌ Logout error:", error.message);
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Auth service error" });
  }
});

router.get("/me", async (req, res) => {
  try {
    const response = await axios.get(`${services.AUTH_SERVICE}/api/auth/me`, {
      headers: getAuthHeader(req),
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("❌ Me error:", error.message);
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Auth service error" });
  }
});

router.put("/me", async (req, res) => {
  try {
    const response = await axios.put(
      `${services.AUTH_SERVICE}/api/auth/me`,
      req.body,
      { headers: getAuthHeader(req) },
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("❌ Update me error:", error.message);
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Auth service error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const response = await axios.get(
      `${services.AUTH_SERVICE}/api/auth/users`,
      { headers: getAuthHeader(req) },
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("❌ Users error:", error.message);
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Auth service error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const response = await axios.delete(
      `${services.AUTH_SERVICE}/api/auth/users/${req.params.id}`,
      { headers: getAuthHeader(req) },
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("❌ Delete user error:", error.message);
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Auth service error" });
  }
});

export default router;
