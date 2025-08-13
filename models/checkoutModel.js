const mongodb = require("../data/database");
const bookModel = require ("./booksModel");

const checkoutModel = {};

// Function to get all checkout entries
checkoutModel.getAllCheckout = async () => {
    try {
        const checkout = await mongodb.getDatabase().db().collection("checkout").find({}).toArray();
        return checkout;
    } catch (error) {
        return error.message;
    }
};

// Function to get checkout entry by ID
checkoutModel.getCheckoutById = async (id) => {
    try {
        const checkout = await mongodb.getDatabase().db().collection("checkout").find({ _id: id }).toArray();
        return checkout;
    } catch (error) {
        return error.message;
    }
};

// Function to create a new checkout entry
checkoutModel.createCheckout = async (checkoutData) => {
    try {
        const newCheckout = await mongodb.getDatabase().db().collection("checkout").insertOne(checkoutData);
        return newCheckout;
    } catch (error) {
        return error.message;
    }
};

// Function to update a checkout entry by ID
checkoutModel.updateCheckoutById = async (id, checkoutData) => {
    const cleanCheckoutData = Object.fromEntries(
    Object.entries(checkoutData).filter(([_, v]) => v !== null && v !== undefined && v !== "")
    );
    try {
        const updatedCheckout = await mongodb.getDatabase().db().collection("checkout").updateOne({ _id: id }, { $set: cleanCheckoutData });
        return updatedCheckout;
    } catch (error) {
        return error.message;
    }
};

// Function to delete a checkout entry by ID
checkoutModel.deleteCheckoutById = async (id) => {
    try {
        const deletedCheckout = await mongodb.getDatabase().db().collection("checkout").deleteOne({ _id: id });
        return deletedCheckout;
    } catch (error) {
        return error.message;
    }
};

module.exports = checkoutModel;