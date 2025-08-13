const usersModel = require('../models/usersModel');
const ObjectId = require('mongodb').ObjectId;

const usersController = {};

// Get all users
usersController.getAllUsers = async (req, res, next) => {
    // #swagger.tags=['User']
    try {
        const users = await usersModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next({
            status: 500,
            message: `Error fetching users: ${error.message}`,
            stack: error.stack
        });
    }
};

// Get user by ID
usersController.getUserById = async (req, res, next) => {
    // #swagger.tags=['User']
    const id = ObjectId.createFromHexString(req.params.id.trim());
    try {
        const users = await usersModel.getUserById(id);
        if (!users.length) {
            next({
                status: 404,
                message: `User with ID: ${id} not found`
            });
        } else {
            res.status(200).json(users[0]);
        }
    } catch (error) {
        next({
            status: 500,
            message: `Error fetching user: ${error.message}`,
            stack: error.stack
        });
    }
};


// Create a new user
usersController.createUser = async (req, res, next) => {
    // #swagger.tags=['User']
    const userData = {
        name: req.body.name,
        email: req.body.email,
        googleId: req.body.googleId,
    };
    try {
        const newUser = await usersModel.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        next({
            status: 500,
            message: `Error creating user: ${error.message}`,
            stack: error.stack
        });
    }
}

// Update user by ID
usersController.upadteUserById = async (req, res, next) => {
    // #swagger.tags=['User']
    const id = ObjectId.createFromHexString(req.params.id.trim());
    const userData = {
        name: req.body.name,
        email: req.body.email,
        googleId: req.body.googleId,
    };
    try {
        const updatedUser = await usersModel.updateUserById(id, userData);
        if (updatedUser.modifiedCount === 0) {
            next({
                status: 404,
                message: `User with ID: ${id} not found or no changes made`
            });
        } else {
            res.status(200).json({ message: `User with ID: ${id} updated successfully` });
        }
    } catch (error) {
        next({
            status: 500,
            message: `Error updating user: ${error.message}`,
            stack: error.stack
        });
    }
}

// Delete user
usersController.deleteUserById = async (req, res, next) => {
    // #swagger.tags=['User']
    const id = ObjectId.createFromHexString(req.params.id.trim());
    try {
        const deletedUser = await usersModel.deleteUserById(id);
        if (deletedUser.deletedCount === 0) {
            next({
                status: 404,
                message: `User with ID: ${id} not found`
            });
        } else {
            res.status(200).send({ message: `User with ID: ${id} deleted successfully` });
        }
    } catch (error) {
        next({
            status: 500,
            message: `Error deleting user: ${error.message}`,
            stack: error.stack
        });
    }
};

module.exports = usersController;