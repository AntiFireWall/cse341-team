const staffModel = require('../models/staffModel');

const staffController = {};

// Get all staff
staffController.getAllStaff = async (req, res, next) => {
    try {
        const staff = await staffModel.getAllStaff();
        res.status(200).json(staff);
    } catch (error) {
        next({
            status: 500,
            message: `Error fetching staff: ${error.message}`,
            stack: error.stack
        });
    }
};

// Get staff by ID
staffController.getStaffById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const staff = await staffModel.getStaffById(id);
        if (!staff.length) {
            next({
                status: 404,
                message: `Staff with ID: ${id} not found`
            });
        } else {
            res.status(200).json(staff[0]);
        }
    } catch (error) {
        next({
            status: 500,
            message: `Error fetching staff: ${error.message}`,
            stack: error.stack
        });
    }
};

// Create staff
staffController.createStaff = async (req, res, next) => {
    const staffData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
    };
    try {
        const newStaff = await staffModel.createStaff(staffData);
        res.status(201).json({ message: `Staff with ID: ${newStaff.insertedId} created successfully` });
    } catch (error) {
        next({
            status: 500,
            message: `Error creating staff: ${error.message}`,
            stack: error.stack
        });
    }
};

// Update staff
staffController.updateStaff = async (req, res, next) => {
    const id = req.params.id;
    const staffData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };
    try {
        const updatedStaff = await staffModel.updateStaffById(id, staffData);
        if (updatedStaff.modifiedCount === 0) {
            next({
                status: 404,
                message: `Staff with ID: ${id} not found or no changes made`
            });
        } else {
            res.status(200).send({ message: `Staff with ID: ${id} updated successfully` });
        }
    } catch (error) {
        next({
            status: 500,
            message: `Error updating staff: ${error.message}`,
            stack: error.stack
        });
    }
};

// Delete staff
staffController.deleteStaff = async (req, res, next) => {
    const id = req.params.id;
    try {
        const deletedStaff = await staffModel.deleteStaffById(id);
        if (deletedStaff.deletedCount === 0) {
            next({
                status: 404,
                message: `Staff with ID: ${id} not found`
            });
        } else {
            res.status(200).send({ message: `Staff with ID: ${id} deleted successfully` });
        }
    } catch (error) {
        next({
            status: 500,
            message: `Error deleting staff: ${error.message}`,
            stack: error.stack
        });
    }
};

module.exports = staffController;