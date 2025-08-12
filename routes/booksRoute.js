const express = require("express");
const router = new express.Router();
const booksValidator = require("../utilities/booksValidation");
const booksController = require("../controllers/booksController");

router.get("/", booksController.getAllBooks);

router.get("/:isbn", booksController.getBookByIsbn);

router.post("/new", booksValidator.addBookRules(), booksValidator.checkBookData, booksController.createBook);

router.put("/update/:isbn", booksValidator.addBookRules(), booksValidator.checkBookData, booksController.updateBookByIsbn);

router.delete("/delete/:isbn", booksController.deleteBookByIsbn);



module.exports = router;