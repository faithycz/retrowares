const axios = require("axios");
const https = require("https");
const fs = require("fs");

const agent = new https.Agent({
  cert: fs.readFileSync("/data/ist411-2026.cert"),
  key: fs.readFileSync("/data/ist411-2026.key"),
  rejectUnauthorized: false,
});

// Create and Read and Update and Delete Testing
describe("User Management API", () => {
  const createUrl = "https://ist411.up.ist.psu.edu:3001/usermanagement";
  const readUrl = "https://ist411.up.ist.psu.edu:3001/usermanagement";
  const updateUrl = "https://ist411.up.ist.psu.edu:3001/usermanagement";
  const deleteUrl = "https://ist411.up.ist.psu.edu:3001/usermanagement";
  let createdUser;

  it("should create/read/update/delete user profiles", async () => {
    // Create
    try {
      const createResponse = await axios.post(
        createUrl,
        {
          firstName: "John",
          lastName: "Doe",
          age: 20,
          email: "johndoe@gmail.com",
          phone: "123-456-7890",
          streetAddress: "100 Random Rd",
          city: "Somecity",
          state: "PA",
          zipCode: "12345",
        },
        { httpsAgent: agent },
      );
      expect(createResponse.status).toBe(201);
      expect(createResponse.data).toEqual(
        jasmine.objectContaining({
          firstName: "John",
          lastName: "Doe",
          age: 20,
          email: "johndoe@gmail.com",
          phone: "123-456-7890",
          streetAddress: "100 Random Rd",
          city: "Somecity",
          state: "PA",
          zipCode: "12345",
        }),
      );
      createdUser = createResponse.data;
      console.log("Created User: ", createdUser);

      // Read
      const readResponse = await axios.get(`${readUrl}/${createdUser._id}`, {
        httpsAgent: agent,
      });
      expect(readResponse.status).toBe(200);

      expect(readResponse.data).toEqual(
        jasmine.objectContaining({
          _id: createdUser._id,
          firstName: "John",
          lastName: "Doe",
          age: 20,
          email: "johndoe@gmail.com",
          phone: "123-456-7890",
          streetAddress: "100 Random Rd",
          city: "Somecity",
          state: "PA",
          zipCode: "12345",
        }),
      );

      // Update
      const updateResponse = await axios.patch(
        `${updateUrl}/${createdUser._id}`,
        {
          firstName: "Jane",
          age: 21,
          email: "janedoe@gmail.com",
        },
        { httpsAgent: agent },
      );
      expect(updateResponse.status).toBe(200);
      expect(updateResponse.data).toEqual(
        jasmine.objectContaining({
          _id: createdUser._id,
          firstName: "Jane",
          age: 21,
          email: "janedoe@gmail.com",
        }),
      );

      // Delete
      const deleteResponse = await axios.delete(
        `${deleteUrl}/${createdUser._id}`,
        { httpsAgent: agent },
      );
      expect(deleteResponse.status).toBe(200);

      // Verify deletion
      try {
        await axios.get(`${readUrl}/${createdUser._id}`, { httpsAgent: agent });
        fail("User should have been deleted");
      } catch (error) {
        expect(error.response.status).toBe(404);
      }
    } catch (error) {
      fail(error);
    }
  });
});
