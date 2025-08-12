const mongodb = require("../data/database");

const staffModel = {};

// Function to get all staff members
staffModel.getAllStaff = async () => {
    try {
        const staff = await mongodb.getDatabase().db().collection("staff").find({}).toArray();
        return staff;
    } catch (error) {
        return error.message;
    }
};

// Function to get staff by ID
staffModel.getStaffById = async (id) => {
    try {
        const staff = await mongodb.getDatabase().db().collection("staff").find({ _id: id }).toArray();
        return staff;
    } catch (error) {
        return error.message;
    }
};

// Function to create a new staff member
staffModel.createStaff = async (staffData) => {
    try {
        const newStaff = await mongodb.getDatabase().db().collection("staff").insertOne(staffData);
        return newStaff;
    } catch (error) {
        return error.message;
    }
};

// Function to update staff by ID
staffModel.updateStaffById = async (id, staffData) => {
    try {
        const updatedStaff = await mongodb.getDatabase().db().collection("staff").updateOne({ _id: id }, { $set: staffData });
        return updatedStaff;
    } catch (error) {
        return error.message;
    }
};

// Function to delete staff by ID
staffModel.deleteStaffById = async (id) => {
    try {
        const deletedStaff = await mongodb.getDatabase().db().collection("staff").deleteOne({ _id: id });
        return deletedStaff;
    } catch (error) {
        return error.message;
    }
};

module.exports = staffModel;