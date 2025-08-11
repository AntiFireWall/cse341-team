const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/index");
const staffController = require("../controllers/staffController");

// Define routes
router.get("/", utilities.handleErrors(staffController.getAllStaff));
router.get("/:id", utilities.handleErrors(staffController.getStaffById));
router.post("/", utilities.handleErrors(staffController.createStaff));
router.put("/:id", utilities.handleErrors(staffController.updateStaff));
router.delete("/:id", utilities.handleErrors(staffController.deleteStaff));

module.exports = router;