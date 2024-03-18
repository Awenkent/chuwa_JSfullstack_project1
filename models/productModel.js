const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    category: String,
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    imageLink: {
      type: String,
      required: true,
    },
  },
  { collection: "PRODUCT" }
);

const Product = mongoose.model("PRODUCT", productSchema);

module.exports = Product;
