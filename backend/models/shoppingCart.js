const mongoose = require("mongoose");

// Define schema
const shoppingCartSchema = new mongoose.Schema({
  productName: {
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
const ShoppingCart = mongoose.model("shoppingcartGiedrycz", shoppingCartSchema);
module.exports = ShoppingCart;
