const axios = require("axios");
const https = require("https");
const fs = require("fs");

const agent = new https.Agent({
  cert: fs.readFileSync("/data/ist411-2026.cert"),
  key: fs.readFileSync("/data/ist411-2026.key"),
  rejectUnauthorized: false,
});

// Create Testing
describe("Shipping API", () => {
  const createUrl = "https://ist411.up.ist.psu.edu:3001/shipping";
  const readUrl = "https://ist411.up.ist.psu.edu:3001/shipping";
  let createdShipping;

  it("should create shipments", async () => {
    // Create
    try {
      const createResponse = await axios.post(
        createUrl,
        {
          firstName: "John",
          lastName: "Doe",
          address1: "100 Random Rd",
          address2: "Suite 100",
          city: "Somecity",
          state: "PA",
          zipCode: "12345",
          carrier: "FedEx",
          method: "Ground",
        },
        { httpsAgent: agent },
      );
      expect(createResponse.status).toBe(201);
      expect(createResponse.data).toEqual(
        jasmine.objectContaining({
          firstName: "John",
          lastName: "Doe",
          address1: "100 Random Rd",
          address2: "Suite 100",
          city: "Somecity",
          state: "PA",
          zipCode: "12345",
          carrier: "FedEx",
          method: "Ground",
        }),
      );
      createdShipping = createResponse.data;
      console.log("Created Shipment: ", createdShipping);
    } catch (error) {
      fail(error);
    }
  });
});
