const axios = require("axios");
const https = require("https");
const fs = require("fs");

const agent = new https.Agent({
  cert: fs.readFileSync("/data/ist411-2026.cert"),
  key: fs.readFileSync("/data/ist411-2026.key"),
  rejectUnauthorized: false,
});

// Create Testing
describe("Billings API", () => {
  const createUrl = "https://ist411.up.ist.psu.edu:3001/billings";
  const readUrl = "https://ist411.up.ist.psu.edu:3001/billings";
  let createdBillings;

  it("should create billings", async () => {
    // Create
    try {
      const createResponse = await axios.post(
        createUrl,
        {
          cardType: "Visa",
          cardNum: "1234567890000000",
          expDate: "12/2030",
          cvv: "123",
          holderName: "John Doe",
        },
        { httpsAgent: agent },
      );
      expect(createResponse.status).toBe(201);
      expect(createResponse.data).toEqual(
        jasmine.objectContaining({
          cardType: "Visa",
          cardNum: "1234567890000000",
          expDate: "12/2030",
          cvv: "123",
          holderName: "John Doe",
        }),
      );
      createdBillings = createResponse.data;
      console.log("Created Billings: ", createdBillings);
    } catch (error) {
      fail(error);
    }
  });
});
