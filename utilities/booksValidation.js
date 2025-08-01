const { body, validationResult } = require("express-validator")
const validate = {}

// validation for adding a new book
validate.addBookRules = () =>{
    return [
        body("bookTitle")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1})
            .withMessage("Book name is required and must be at least 1 character long"),
        body("mainAuthor")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("main author is required"),
        body("coAuthors")
            .trim()
            .escape(),
        body("publishedDate")
            .trim()
            .escape()
            .notEmpty()
            .isDate()
            .withMessage("Published date is required and must be a valid date in the format YYYY-MM-DD (e.g., 2023-10-01)."),
        body("publisher")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("The publisher is required and must be a string"),
        body("genre")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Genre is required and must be a string"),
        body("language")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Language is required and must be a string"),
        body("edition")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Edition is required and must be a string"),
        body("format")
            .trim()
            .escape()
            .notEmpty()
            .isIn(["Hardcover", "Paperback", "Ebook", "ebook", "hardcover", "paperback"])
            .withMessage("Format is required and must be one of the following: Hardcover, Paperback, Ebook"),
        body("isbn")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("ISBN is required and must be a valid ISBN number")
    ]
}


// middleware to validate the rquest
validate.checkBookData = (req, res, next) => {
    let errors = []
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        next({
            status: 400,
            message: `Validation errors: ${errors.array().map(err => err.msg).join(", ")}`
        });
    }
    next();
}

module.exports = validate;