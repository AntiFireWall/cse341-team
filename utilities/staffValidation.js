// utilities/staffValidation.js
const { body, validationResult } = require("express-validator");
const validate = {};

// Validation for adding a new staff member
validate.addStaffRules = () => {
    return [
        body("name")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage("Name is required and must be at least 3 characters long."),
        body("position")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Position is required."),
        body("email")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .withMessage("Must be a valid email address."),
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