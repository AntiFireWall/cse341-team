const mongodb = require('../data/database');
const util = {};

// function to check if the user is authenticated
util.isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return next({
            status: 401,
            message: "You are not authenticated. Please log in."
        });
    }
    next();
}

// function to check if the user is a staff and has the required role
util.isLibrarian = async (req, res, next) => {
    try {
        const staff = await mongodb.getDatabase().db().collection("staff").findOne({ email: req.session.user.email });
        if (staff && staff.role === 'Librarian' || staff.role === 'librarian') {
            return next();
        } else {
            next({
            status: 403,
            message: "You are not authorized to access this resource."
        });
        }
        
    }
    catch (error) {
        return next({
            status: 500,
            message: `Error checking authorization: ${error.message}`,
            stack: error.stack
        });
    }
}

// function to check if the user is a staff and has the required role
util.isAdmin = async (req, res, next) => {
    try {
        const staff = await mongodb.getDatabase().db().collection("staff").findOne({ email: req.session.user.email });
        if (staff && staff.role === 'Admin' || staff.role === 'admin') {
            return next();
        } else {
            next({
            status: 403,
            message: "You are not authorized to access this resource."
        });
        }
        
    }
    catch (error) {
        return next({
            status: 500,
            message: `Error checking authorization: ${error.message}`,
            stack: error.stack
        });
    }
}

//General error handling middleware
util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = util;