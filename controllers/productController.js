const Product = require("../models/productModel");
const User = require("../models/userModel");
// const { errorHandler } = require("../middlewares/errorHandler");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error on getting all products" });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params?.id);
    res.status(200).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error on getting the product" });
  }
};

const createProduct = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (user.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "You are not allowed to create new product" });
    }
    const product = new Product(req.body);
    await product.save();
    res.status(200).json({ message: "Product created successfully!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error on creating new product." });
  }
};

const updateProduct = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    console.log(user.role);
    if (user.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "You are not allowed to edit this product" });
    }
    const product = await Product.findByIdAndUpdate(req.params?.id, req.body);
    res.status(200).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error on updating product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (user.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this product" });
    }
    const product = await Product.findByIdAndDelete(req.params?.id);
    if (!product) {
      throw new Error("Product not found");
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error on deleting the product" });
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
