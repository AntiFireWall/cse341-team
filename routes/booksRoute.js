const express = require("express");
const router = new express.Router();
const booksValidator = require("../utilities/booksValidation");
const booksController = require("../controllers/booksController");
const utilities = require("../utilities/index");

router.get("/", booksController.getAllBooks);

router.get("/:isbn", booksController.getBookByIsbn);

router.post("/new", utilities.isLibrarian, booksValidator.addBookRulesPOST(), booksValidator.checkBookData, booksController.createBook);

router.put("/update/:isbn", utilities.isLibrarian, booksValidator.addBookRulesPUT(), booksValidator.checkBookData, booksController.updateBookByIsbn);

router.delete("/delete/:isbn", utilities.isLibrarian, booksController.deleteBookByIsbn);



module.exports = router;