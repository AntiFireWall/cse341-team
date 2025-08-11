const express = require("express");
const router = new express.Router();
const staffValidator = require("../utilities/staffValidation");
const utilities = require("../utilities/index");
const staffController = require("../controllers/staffController");

router.get("/", utilities.handleErrors(staffController.getAllStaff));

router.get("/:id", utilities.handleErrors(staffController.getStaffById));

router.post("/new", staffValidator.addStaffRules(), staffValidator.checkStaffData, utilities.handleErrors(staffController.createStaff));

router.put("/update/:id", staffValidator.addStaffRules(), staffValidator.checkStaffData, utilities.handleErrors(staffController.updateStaffById));

router.delete("/delete/:id", utilities.handleErrors(staffController.deleteStaffById));



module.exports = router;