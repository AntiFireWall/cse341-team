const checkout = require("../models/checkoutModel");
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
test('Get specified entry from "Checkout" collection.', async () => {
    const expectedResult = {
      "_id": new ObjectId("689c407227dbf480fde85dfc"),
      "checkInDate": "2025-09-03",
      "checkoutBookISBN": "73958206194732518409",
      "checkoutDate": "2025-08-13",
      "email": "elias.korrin@example.com",
      "patronFirstName": "Elias",
      "patronLastName": "Korrin"
    };
    const result = await checkout.getCheckoutById(ObjectId.createFromHexString('689c407227dbf480fde85dfc'));
    expect(result[0]).toEqual(expectedResult);
});

test('Get multiple entries from "Checkout" collection (min 2).', async () => {
    const result = await checkout.getAllCheckout();
    expect(result.length).toBeGreaterThanOrEqual(2);
});