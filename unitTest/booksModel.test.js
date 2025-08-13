const books = require("../models/booksModel");
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
test('Get specified entry from "Books" collection.', async () => {
    const expectedResult = {
    "_id": new ObjectId("689b1e162e416e447db55222"),
    "isbn": "15786248937658215937",
    "bookTitle": "Not Heavy",
    "publishedDate": "2008-02-12",
    "mainAuthor": "Mad Brock",
    "publisher": "Desco printing press",
    "language": "english",
    "format": "Hardcover",
    "genre": "si-fi",
    "edition": "first",
    "available": true
  };
    const result = await books.getBookByIsbn('15786248937658215937');
    expect(result[0]).toEqual(expectedResult);
});

test('Get multiple entries from "Books" collection (min 3).', async () => {
    const result = await books.getAllBooks();
    expect(result.length).toBeGreaterThanOrEqual(3);
});