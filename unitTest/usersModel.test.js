const users = require("../models/usersModel");
const { initDB } = require("../data/database");
const ObjectId = require('mongodb').ObjectId;

beforeAll(async () => {
  await new Promise((resolve, reject) => {
    initDB((err, db) => {
      if (err) return reject(err);
      resolve(db);
    });
  });
});

afterAll(async () => {
  const client = require("../data/database").getDatabase();
  await client.close();
});

// Tests
test('Get specified entry from "Users" collection.', async () => {
    const expectedResult = {
    "_id": new ObjectId("689ceaf0edebe6330d732659"),
    "googleId": "100136152431480416617",
    "email": "ayvazyands@gmail.com",
    "name": "Daniel Ayvazyan"
    }
    const result = await users.getUserById(ObjectId.createFromHexString('689ceaf0edebe6330d732659'));
    expect(result[0]).toEqual(expectedResult);
});

test('Get multiple entries from "Users" collection (min 3).', async () => {
    const result = await users.getAllUsers();
    expect(result.length).toBeGreaterThanOrEqual(3);
});