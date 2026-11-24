const mongoose = require("mongoose");

// Define the schema
const returnsSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  returnProduct: {
    type: String,
    required: true,
    trim: true,
  },
  returnReason: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create a model from schema
const Returns = mongoose.model("returnsGiedrycz", returnsSchema);
module.exports = Returns;
