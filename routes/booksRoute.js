const express = require("express");
const router = new express.Router();
const booksValidator = require("../utilities/booksValidation");
const utilities = require("../utilities/index");
const booksController = require("../controllers/booksController");

router.get("/", utilities.handleErrors(booksController.getAllBooks));

router.get("/:isbn", utilities.handleErrors(booksController.getBookByIsbn));

router.post("/new", booksValidator.addBookRules(), booksValidator.checkBookData, utilities.handleErrors(booksController.createBook));

router.put("/update/:isbn", booksValidator.addBookRules(), booksValidator.checkBookData, utilities.handleErrors(booksController.updateBookByIsbn));

router.delete("/delete/:isbn", utilities.handleErrors(booksController.deleteBookByIsbn));



module.exports = router;