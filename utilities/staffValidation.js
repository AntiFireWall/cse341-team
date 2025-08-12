// utilities/staffValidation.js
const { body, validationResult } = require("express-validator");
const validate = {};

// Validation for adding a new staff member
validate.addStaffRules = () => {
    return [
        body("firstName")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage("First Name is required and must be at least 3 characters long."),
        body("lastName")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage("Last Name is required and must be at least 3 characters long."),
        body("role")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Role is required."),
        body("email")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .withMessage("Must be a valid email address."),
        body("hireDate")
            .trim()
            .escape()
            .notEmpty()
            .isDate()
            .withMessage("Hire date is required and must be a valid date in the format YYYY-MM-DD (e.g., 2023-10-01)."),
    ];
};

// Middleware to validate the request
validate.checkStaffData = (req, res, next) => {
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