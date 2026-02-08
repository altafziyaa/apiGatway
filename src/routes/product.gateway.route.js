import express from "express";
import axios from "axios";
import services from "../config/services.js";

const router = express.Router();

const forwardAuth = (req) => ({
  authorization: req.headers.authorization || "",
});

const proxy = (method, urlBuilder) => async (req, res) => {
  try {
    const response = await axios({
      method,
      url: urlBuilder(req),
      data: req.body,
      headers: forwardAuth(req),
      params: req.query,
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Product service error" });
  }
};

// GET ALL PRODUCTS
router.get(
  "/",
  proxy("get", () => `${services.PRODUCT_SERVICE}/api/products`),
);

// GET PRODUCT BY ID
router.get(
  "/:productId",
  proxy(
    "get",
    (req) => `${services.PRODUCT_SERVICE}/api/products/${req.params.productId}`,
  ),
);
// CREATE PRODUCT
router.post(
  "/",
  proxy("post", () => `${services.PRODUCT_SERVICE}/api/products`),
);

// UPDATE PRODUCT
router.put(
  "/:productId",
  proxy(
    "put",
    (req) => `${services.PRODUCT_SERVICE}/api/products/${req.params.productId}`,
  ),
);

// DELETE PRODUCT
router.delete(
  "/:productId",
  proxy(
    "delete",
    (req) => `${services.PRODUCT_SERVICE}/api/products/${req.params.productId}`,
  ),
);

// RESTORE PRODUCT
router.patch(
  "/:productId/restore",
  proxy(
    "patch",
    (req) =>
      `${services.PRODUCT_SERVICE}/api/products/${req.params.productId}/restore`,
  ),
);

router.get(
  "/internal/:productId",
  proxy(
    "get",
    (req) =>
      `${services.PRODUCT_SERVICE}/api/internal/products/${req.params.productId}`,
  ),
);

export default router;
