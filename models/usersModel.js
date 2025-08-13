const mongodb = require("../data/database");

const usersModel = {};

// Function to get all users
usersModel.getAllUsers = async () => {
    try {
        const users = await mongodb.getDatabase().db().collection("users").find({}).toArray();
        return users;
    } catch (error) {
        return error.message;
    }
};

// Function to get user by ID
usersModel.getUserById = async (id) => {
    try {
        const user = await mongodb.getDatabase().db().collection("users").find({ _id: id }).toArray();
        return user;
    } catch (error) {
        return error.message;
    }
};

// Function to create a new user
usersModel.createUser = async (userData) => {
    try {
        const newUser = await mongodb.getDatabase().db().collection("users").insertOne(userData);
        return newUser;
    } catch (error) {
        return error.message;
    }
}

// Function to update user by ID
usersModel.updateUserById = async (id, userData) => {
    const cleanUserData = Object.fromEntries(
    Object.entries(userData).filter(([_, v]) => v !== null && v !== undefined && v !== "")
    );
    try {
        const updatedUser = await mongodb.getDatabase().db().collection("users").updateOne({ _id: id }, { $set: cleanUserData });
        return updatedUser;
    } catch (error) {
        return error.message;
    }
};

// Function to delete users by ID
usersModel.deleteUserById = async (id) => {
    try {
        const deletedUser = await mongodb.getDatabase().db().collection("users").deleteOne({ _id: id });
        return deletedUser;
    } catch (error) {
        return error.message;
    }
};

module.exports = usersModel;