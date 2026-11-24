const axios = require("axios");
const https = require("https");
const fs = require("fs");

const agent = new https.Agent({
  cert: fs.readFileSync("/data/ist411-2026.cert"),
  key: fs.readFileSync("/data/ist411-2026.key"),
  rejectUnauthorized: false,
});

// Create and Read Testing
describe("Product API", () => {
  const createUrl = "https://ist411.up.ist.psu.edu:3001/product";
  const readUrl = "https://ist411.up.ist.psu.edu:3001/product";
  let createdProduct;

  it("should create/read products", async () => {
    // Create
    try {
      const createResponse = await axios.post(
        createUrl,
        {
          productName: "Game Boy Advance",
          productDesc: "A 2001 32-bit handheld game console by Nintendo.",
          productType: "gaming",
          productPrice: 130.99,
        },
        { httpsAgent: agent },
      );
      expect(createResponse.status).toBe(201);
      expect(createResponse.data).toEqual(
        jasmine.objectContaining({
          productName: "Game Boy Advance",
          productDesc: "A 2001 32-bit handheld game console by Nintendo.",
          productType: "gaming",
          productPrice: 130.99,
        }),
      );
      createdProduct = createResponse.data;
      console.log("Created Product: ", createdProduct);

      // Read
      const readResponse = await axios.get(`${readUrl}/${createdProduct._id}`, {
        httpsAgent: agent,
      });
      expect(readResponse.status).toBe(200);
      expect(readResponse.data).toEqual(
        jasmine.objectContaining({
          _id: createdProduct._id,
          productName: "Game Boy Advance",
          productDesc: "A 2001 32-bit handheld game console by Nintendo.",
          productType: "gaming",
          productPrice: 130.99,
        }),
      );
    } catch (error) {
      fail(error);
    }
  });
});
