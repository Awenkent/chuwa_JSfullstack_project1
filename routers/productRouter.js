const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  // getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", auth, createProduct);
router.get("/:id", getOneProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);
module.exports = router;
