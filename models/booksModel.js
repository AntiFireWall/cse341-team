const mongodb = require("../data/database");

const booksModel = {};

//function to get all books
booksModel.getAllBooks = async () => {
    try {
        const books = await mongodb.getDatabase().db().collection("books").find({}).toArray();
        return books;
    } catch (error) {
        return error.message;
    }
};

//function to get book by ISBN
booksModel.getBookByIsbn = async (isbn) => {
    try {
        const book = await mongodb.getDatabase().db().collection("books").find({ isbn: isbn }).toArray();
        return book;
    } catch (error) {
        return error.message;
    }
}

//function to create a new book
booksModel.createBook = async (bookData) => {
    try {
        const newBook = await mongodb.getDatabase().db().collection("books").insertOne(bookData);
        return newBook;
    } catch (error) {
        return error.message;
    }
};

//function to update book by ISBN
booksModel.updateBookByIsbn = async (isbn, bookData) => {
    try {
        const updatedBook = await mongodb.getDatabase().db().collection("books").updateOne({ isbn: isbn }, { $set: bookData });
        return updatedBook;
    } catch (error) {
        return error.message;
    }
};

//function to delete book by ISBN
booksModel.deleteBookByIsbn = async (isbn) => {
    try {
        const deletedBook = await mongodb.getDatabase().db().collection("books").deleteOne({ isbn: isbn });
        return deletedBook;
    } catch (error) {
        return error.message;
    }
}

module.exports = booksModel;