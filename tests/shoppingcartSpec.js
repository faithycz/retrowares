const axios = require("axios");
const https = require("https");
const fs = require("fs");

const agent = new https.Agent({
  cert: fs.readFileSync("/data/ist411-2026.cert"),
  key: fs.readFileSync("/data/ist411-2026.key"),
  rejectUnauthorized: false,
});

// Create Testing
describe("Shopping Cart API", () => {
  const createUrl = "https://ist411.up.ist.psu.edu:3001/shoppingcart";
  const readUrl = "https://ist411.up.ist.psu.edu:3001/shoppingcart";
  let createdCart;

  it("should create shopping cart items", async () => {
    // Create
    try {
      const createResponse = await axios.post(
        createUrl,
        {
          productName: "Blueberry iMac G3",
          productPrice: 200.99,
        },
        { httpsAgent: agent },
      );
      expect(createResponse.status).toBe(201);
      expect(createResponse.data).toEqual(
        jasmine.objectContaining({
          productName: "Blueberry iMac G3",
          productPrice: 200.99,
        }),
      );
      createdCart = createResponse.data;
      console.log("Created Cart: ", createdCart);
    } catch (error) {
      fail(error);
    }
  });
});
