const mongoose = require("mongoose");

// Define schema
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  productDesc: {
    type: String,
    required: true,
    trim: true,
  },
  productType: {
    type: String,
    required: true,
    trim: true,
  },
  productPrice: {
    type: Number,
    required: true,
    min: 0,
  },
});

// Create model from schema
const Product = mongoose.model("productsGiedrycz", productSchema);
module.exports = Product;
