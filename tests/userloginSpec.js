const axios = require("axios");
const https = require("https");
const fs = require("fs");

const agent = new https.Agent({
  cert: fs.readFileSync("/data/ist411-2026.cert"),
  key: fs.readFileSync("/data/ist411-2026.key"),
  rejectUnauthorized: false,
});

// Create and Read Testing
describe("User Login API", () => {
  const createUrl = "https://ist411.up.ist.psu.edu:3001/userlogin";
  const readUrl = "https://ist411.up.ist.psu.edu:3001/userlogin";
  let createdUser;

  it("should create/login and read users", async () => {
    // Create
    try {
      const createResponse = await axios.post(
        createUrl,
        {
          email: "johndoe@gmail.com",
          password: "abc123",
        },
        { httpsAgent: agent },
      );
      expect(createResponse.status).toBe(201);
      expect(createResponse.data).toEqual(
        jasmine.objectContaining({
          email: "johndoe@gmail.com",
          password: "abc123",
        }),
      );
      createdUser = createResponse.data;
      console.log("Created User: ", createdUser);

      // Read
      const readResponse = await axios.get(readUrl, { httpsAgent: agent });
      expect(readResponse.status).toBe(200);

      const users = readResponse.data;
      const userFound = users.find((u) => u._id === createdUser._id);

      expect(userFound).toBeDefined();
      expect(userFound.email).toBe("johndoe@gmail.com");
      expect(userFound.password).toBe("abc123");
    } catch (error) {
      fail(error);
    }
  });
});
