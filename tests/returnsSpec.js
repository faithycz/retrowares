const axios = require("axios");
const https = require("https");
const fs = require("fs");

const agent = new https.Agent({
  cert: fs.readFileSync("/data/ist411-2026.cert"),
  key: fs.readFileSync("/data/ist411-2026.key"),
  rejectUnauthorized: false,
});

// Create Testing
describe("Returns API", () => {
  const createUrl = "https://ist411.up.ist.psu.edu:3001/returns";
  const readUrl = "https://ist411.up.ist.psu.edu:3001/returns";
  let createdReturns;

  it("should create returns", async () => {
    // Create
    try {
      const createResponse = await axios.post(
        createUrl,
        {
          fullName: "John Doe",
          email: "johndoe@gmail.com",
          returnProduct: "Original Tamagotchi",
          returnReason: "defective",
        },
        { httpsAgent: agent },
      );
      expect(createResponse.status).toBe(201);
      expect(createResponse.data).toEqual(
        jasmine.objectContaining({
          fullName: "John Doe",
          email: "johndoe@gmail.com",
          returnProduct: "Original Tamagotchi",
          returnReason: "defective",
        }),
      );
      createdReturns = createResponse.data;
      console.log("Created Return: ", createdReturns);
    } catch (error) {
      fail(error);
    }
  });
});
