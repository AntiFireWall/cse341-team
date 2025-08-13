// utilities/staffValidation.js
const { body, validationResult } = require("express-validator");
const validate = {};

// Validation for adding a new user member
validate.addUserRulesPOST = () => {
    return [
        body("name")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage("First Name is required and must be at least 3 characters long."),
        body("email")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .withMessage("Must be a valid email address."),
    ];
};

// Validation for updating a user member information
validate.addUserRulesPUT = () => {
    return [
        body("name")
            .optional()
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage("First Name is required and must be at least 3 characters long."),
        body("email")
            .optional()
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .withMessage("Must be a valid email address."),
    ];
};

// Middleware to validate the request
validate.checkUserData = (req, res, next) => {
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