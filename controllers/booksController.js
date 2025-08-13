const booksModel = require('../models/booksModel');

const booksController = {};


//function to get all books
booksController.getAllBooks = async (req, res, next) => {
    // #swagger.tags=['Books']
    try {
        const books = await booksModel.getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        next({
            status: 500,
            message: `Error fetching books: ${error.message}`,
            stack: error.stack
        });
    }
}


//function to get book by ISBN
booksController.getBookByIsbn = async (req, res, next) => {
    // #swagger.tags=['Books']
    const isbn = req.params.isbn;
    try {
        const book = await booksModel.getBookByIsbn(isbn.trim());
        if (!book.length) {
            next({
                status: 404,
                message: `Book with ISBN: ${isbn} not found`
            });
        } else {
            res.status(200).json(book[0]);
        }
        
    } catch (error) {
        next({
            status: 500,
            message: `Error fetching book: ${error.message}`,
            stack: error.stack
        });
    }
    console.log(book[0]);
}

//function to create a new book
booksController.createBook = async (req, res, next) => {
    // #swagger.tags=['Books']
    const bookData = {
        isbn: req.body.isbn,
        bookTitle: req.body.bookTitle,
        publishedDate: req.body.publishedDate,
        mainAuthor: req.body.mainAuthor,
        publisher: req.body.publisher,
        language: req.body.language,
        format: req.body.format,
        genre: req.body.genre,
        edition: req.body.edition,
        available: true
    }
    console.log(bookData.available);
    try {
        const newBook = await booksModel.createBook(bookData);
        if (newBook === "already exists") {
            next({
                status: 400,
                message: "Book with this ISBN already exists."
            });
            return;
        }
        res.status(201).json({message: `Book with ISBN: ${bookData.isbn} created successfully`, bookId: newBook.insertedId});
    } catch (error) {
        next({
            status: 500,
            message: `Error creating book: ${error.message}`,
            stack: error.stack
        });
    }
}

//function to update a book by ISBN
booksController.updateBookByIsbn = async (req, res, next) => {
    // #swagger.tags=['Books']
    const isbn = req.params.isbn;
    const bookData = {
        isbn: req.body.isbn,
        bookTitle: req.body.bookTitle,
        publishedDate: req.body.publishedDate,
        mainAuthor: req.body.mainAuthor,
        publisher: req.body.publisher,
        language: req.body.language,
        format: req.body.format,
        genre: req.body.genre,
        edition: req.body.edition,
        available: req.body.available
    };
    try {
        const updatedBook = await booksModel.updateBookByIsbn(isbn.trim(), bookData);
        if (updatedBook.modifiedCount === 0) {
            next({
                status: 404,
                message: `Book with ISBN: ${isbn} not found or no changes made`
            });
        } else {
            res.status(200).send({message: `Book with ISBN: ${isbn} updated successfully`, modifiedCount: updatedBook.modifiedCount});
        }
    } catch (error) {
        next({
            status: 500,
            message: `Error updating book: ${error.message}`,
            stack: error.stack
        })
    }
}

//function to delete a book by ISBN
booksController.deleteBookByIsbn = async (req, res, next) => {
    // #swagger.tags=['Books']
    const isbn = req.params.isbn;
    try {
        const deletedBook = await booksModel.deleteBookByIsbn(isbn.trim());
        if (deletedBook.deletedCount === 0) {
            next({
                status: 404,
                message: `Book with ISBN: ${isbn} not found`
            });
        } else {
            res.status(200).send({message: `Book with ISBN: ${isbn} deleted successfully`, deletedCount: deletedBook.deletedCount});
        }
    } catch (error) {
        next({
            status: 500,
            message: `Error deleting book: ${error.message}`,
            stack: error.stack
        });
    }
}

module.exports = booksController;