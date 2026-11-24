const mongoose = require("mongoose");

// Define the schema
const shippingSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  address1: {
    type: String,
    required: true,
    trim: true,
  },
  address2: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  zipCode: {
    type: String,
    required: true,
    trim: true,
  },
  carrier: {
    type: String,
    required: true,
    trim: true,
  },
  method: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create a model from schema
const Shipping = mongoose.model("shippingGiedrycz", shippingSchema);
module.exports = Shipping;
