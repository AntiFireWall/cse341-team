const checkoutModel = require('../models/checkoutModel');
const ObjectId = require('mongodb').ObjectId;

const checkoutController = {};

// Get all checkout entries
checkoutController.getAllCheckout = async (req, res, next) => {
    // #swagger.tags=['Checkout']
    try {
        const checkout = await checkoutModel.getAllCheckout();
        res.status(200).json(checkout);
    } catch (error) {
        next({
            status: 500,
            message: `Error fetching checkout: ${error.message}`,
            stack: error.stack
        });
    }
};

// Get checkout entry by ID
checkoutController.getCheckoutById = async (req, res, next) => {
    // #swagger.tags=['Checkout']
    const id = ObjectId.createFromHexString(req.params.id.trim());
    try {
        const checkout = await checkoutModel.getCheckoutById(id);
        if (!checkout.length) {
            next({
                status: 404,
                message: `Checkout entry with ID: ${id} not found`
            });
        } else {
            res.status(200).json(checkout[0]);
        }
    } catch (error) {
        next({
            status: 500,
            message: `Error fetching checkout: ${error.message}`,
            stack: error.stack
        });
    }
};

// Create checkout entry
checkoutController.createCheckout = async (req, res, next) => {
    // #swagger.tags=['Checkout']
    const checkoutData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
        hireDate: req.body.hireDate,
    };
    try {
        const newCheckout = await checkoutModel.createCheckout(checkoutData);
        res.status(201).json({ message: `Checkout with ID: ${newCheckout.insertedId} created successfully` });
    } catch (error) {
        next({
            status: 500,
            message: `Error creating checkout: ${error.message}`,
            stack: error.stack
        });
    }
};

// Update checkout entry
checkoutController.updateCheckoutById = async (req, res, next) => {
    // #swagger.tags=['Checkout']
    const id = ObjectId.createFromHexString(req.params.id.trim());
    const checkoutData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
        hireDate: req.body.hireDate,
    };
    try {
        const updatedCheckout = await checkoutModel.updateCheckoutById(id, checkoutData);
        if (updatedCheckout.modifiedCount === 0) {
            next({
                status: 404,
                message: `Checkout with ID: ${id} not found or no changes made`
            });
        } else {
            res.status(200).send({ message: `Checkout with ID: ${id} updated successfully` });
        }
    } catch (error) {
        next({
            status: 500,
            message: `Error updating checkout: ${error.message}`,
            stack: error.stack
        });
    }
};

// Delete checkout entry by ID
checkoutController.deleteCheckoutById = async (req, res, next) => {
    // #swagger.tags=['Checkout']
    const id = ObjectId.createFromHexString(req.params.id.trim());
    try {
        const deletedCheckout = await checkoutModel.deleteCheckoutById(id);
        if (deletedCheckout.deletedCount === 0) {
            next({
                status: 404,
                message: `Checkout entry with ID: ${id} not found`
            });
        } else {
            res.status(200).send({ message: `Checkout entry with ID: ${id} deleted successfully` });
        }
    } catch (error) {
        next({
            status: 500,
            message: `Error deleting checkout entry: ${error.message}`,
            stack: error.stack
        });
    }
};

module.exports = checkoutController;