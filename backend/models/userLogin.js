const mongoose = require("mongoose");

// Define the schema
const userLoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create a model from schema
const UserLogin = mongoose.model("userloginGiedrycz", userLoginSchema);
module.exports = UserLogin;
