import express from "express";
import axios from "axios";
import services from "../config/services.js";

const router = express.Router();

const getAuthHeader = (req) => ({
  authorization: req.headers.authorization || "",
});

// ---------- PUBLIC ----------
router.post("/signup", async (req, res) => {
  try {
    const response = await axios.post(
      `${services.AUTH_SERVICE}/api/auth/signup`,
      req.body,
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data);
  }
});

router.post("/login", async (req, res) => {
  try {
    const response = await axios.post(
      `${services.AUTH_SERVICE}/api/auth/login`,
      req.body,
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data);
  }
});

// ---------- PROTECTED ----------
router.post("/logout", async (req, res) => {
  try {
    const response = await axios.post(
      `${services.AUTH_SERVICE}/api/auth/logout`,
      {},
      { headers: getAuthHeader(req) },
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data);
  }
});

router.get("/me", async (req, res) => {
  try {
    const response = await axios.get(`${services.AUTH_SERVICE}/api/auth/me`, {
      headers: getAuthHeader(req),
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data);
  }
});

router.put("/me", async (req, res) => {
  try {
    const response = await axios.put(
      `${services.AUTH_SERVICE}/api/auth/me`,
      req.body,
      { headers: getAuthHeader(req) },
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data);
  }
});

// ---------- ADMIN ----------
router.get("/users", async (req, res) => {
  try {
    const response = await axios.get(
      `${services.AUTH_SERVICE}/api/auth/users`,
      { headers: getAuthHeader(req) },
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const response = await axios.delete(
      `${services.AUTH_SERVICE}/api/auth/users/${req.params.id}`,
      { headers: getAuthHeader(req) },
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data);
  }
});

export default router;
