const { body, validationResult } = require("express-validator");
const validate = {};

// Validation for adding a new checkout entry
validate.addCheckoutRulesPOST = [
        body("patronFirstName")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage("Patron First Name is required and must be at least 3 characters long."),
        body("patronLastName")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage("Patron Last Name is required and must be at least 3 characters long."),
        body("email")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .withMessage("Must be a valid email address."),
        body("checkoutBookISBN")
            .trim()
            .escape()
            .notEmpty()
            .isLength({min: 20})
            .withMessage("ISBN is required and must be a valid ISBN number"),
        body("checkoutDate")
            .trim()
            .escape()
            .notEmpty()
            .isDate()
            .withMessage("Checkout Date is required and must be a valid date in the format YYYY-MM-DD (e.g., 2023-10-01)."),
        body("checkInDate")
            .trim()
            .escape()
            .notEmpty()
            .isDate()
            .withMessage("Check In Date is required and must be a valid date in the format YYYY-MM-DD (e.g., 2023-10-01)."),
    ];

// Validation for updating a checkout entry information
validate.addCheckoutRulesPUT = [
        body("patronFirstName")
            .optional()
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage("Patron First Name is required and must be at least 3 characters long."),
        body("patronLastName")
            .optional()
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage("Patron Last Name is required and must be at least 3 characters long."),
        body("email")
            .optional()
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .withMessage("Must be a valid email address."),
        body("checkoutBookISBN")
            .optional()
            .trim()
            .escape()
            .notEmpty()
            .isLength({min: 20})
            .withMessage("ISBN is required and must be a valid ISBN number"),
        body("checkoutDate")
            .optional()
            .trim()
            .escape()
            .notEmpty()
            .isDate()
            .withMessage("Checkout Date is required and must be a valid date in the format YYYY-MM-DD (e.g., 2023-10-01)."),
        body("checkInDate")
            .optional()
            .trim()
            .escape()
            .notEmpty()
            .isDate()
            .withMessage("Check In Date is required and must be a valid date in the format YYYY-MM-DD (e.g., 2023-10-01)."),
    ];

// Middleware to validate the request
validate.checkCheckoutData = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({
            status: 400,
            message: `Validation errors: ${errors.array().map(err => err.msg).join(", ")}`
        });
    }
    next();
};

module.exports = validate;