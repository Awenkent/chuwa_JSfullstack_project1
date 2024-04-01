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
    creationDate: {
      type: Number,
      required: true,
      default: Date.now(),
    },
  },
  { collection: "PRODUCT" }
);

const Product = mongoose.model("PRODUCT", productSchema);

module.exports = Product;
