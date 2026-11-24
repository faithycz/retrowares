const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const https = require("https");
const fs = require("fs");

const UserLogin = require("./models/userLogin");
const UserManagement = require("./models/userManagement");
const Product = require("./models/product");
const ShoppingCart = require("./models/shoppingCart");
const Shipping = require("./models/shipping");
const Billings = require("./models/billings");
const Returns = require("./models/returns");

const app = express();
const port = 3001;

// CORS Middleware
app.use(cors());

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI);

const options = {
  key: fs.readFileSync("/data/ist411-2026.key"),
  cert: fs.readFileSync("/data/ist411-2026.cert"),
};

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});

// == CRUD ENDPOINTS FOR EACH WEB PAGE == //

// USERLOGIN //
// Create
app.post("/userlogin", async (req, res) => {
  try {
    const user = new UserLogin(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Read
app.get("/userlogin", async (req, res) => {
  try {
    const user = await UserLogin.find();
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// USERMANAGEMENT //
// Create
app.post("/usermanagement", async (req, res) => {
  try {
    const user = new UserManagement(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Read
app.get("/usermanagement/:id", async (req, res) => {
  try {
    const user = await UserManagement.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update
app.patch("/usermanagement/:id", async (req, res) => {
  try {
    const user = await UserManagement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete
app.delete("/usermanagement/:id", async (req, res) => {
  try {
    const user = await UserManagement.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// PRODUCT //
// Create
app.post("/product", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Read
app.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

// SHOPPINGCART //
// Create
app.post("/shoppingcart", async (req, res) => {
  try {
    const shoppingCart = new ShoppingCart(req.body);
    await shoppingCart.save();
    res.status(201).send(shoppingCart);
  } catch (err) {
    res.status(400).send(err);
  }
});

// SHIPPING //
// Create
app.post("/shipping", async (req, res) => {
  try {
    const shipping = new Shipping(req.body);
    await shipping.save();
    res.status(201).send(shipping);
  } catch (err) {
    res.status(400).send(err);
  }
});

// BILLINGS //
// Create
app.post("/billings", async (req, res) => {
  try {
    const billings = new Billings(req.body);
    await billings.save();
    res.status(201).send(billings);
  } catch (err) {
    res.status(400).send(err);
  }
});

// RETURNS //
// Create
app.post("/returns", async (req, res) => {
  try {
    const returns = new Returns(req.body);
    await returns.save();
    res.status(201).send(returns);
  } catch (err) {
    res.status(400).send(err);
  }
});
