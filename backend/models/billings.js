const mongoose = require("mongoose");

// Define the schema
const billingsSchema = new mongoose.Schema({
  cardType: {
    type: String,
    required: true,
    trim: true,
  },
  cardNum: {
    type: String,
    required: true,
    trim: true,
  },
  expDate: {
    type: String,
    required: true,
    trim: true,
  },
  cvv: {
    type: String,
    required: true,
    trim: true,
  },
  holderName: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create a model from schema
const Billings = mongoose.model("billingsGiedrycz", billingsSchema);
module.exports = Billings;
