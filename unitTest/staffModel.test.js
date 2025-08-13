const staff = require("../models/staffModel");
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
test('Get specified entry from "Staff" collection.', async () => {
    const expectedResult = {
    "_id": new ObjectId("689b1f76570b11c012fb10ec"),
    "firstName": "Sophia",
    "lastName": "Martinez",
    "email": "sophia.martinez@citylibrary.org",
    "role": "Archivist",
    "hireDate": "2016-01-22"
  };
    const result = await staff.getStaffById(ObjectId.createFromHexString('689b1f76570b11c012fb10ec'));
    expect(result[0]).toEqual(expectedResult);
});

test('Get multiple entries from "Staff" collection (min 3).', async () => {
    const result = await staff.getAllStaff();
    expect(result.length).toBeGreaterThanOrEqual(3);
});