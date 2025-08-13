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