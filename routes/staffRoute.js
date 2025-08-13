const express = require("express");
const router = new express.Router();
const staffValidator = require("../utilities/staffValidation");
const staffController = require("../controllers/staffController");
const utilities = require("../utilities/index");

router.get("/", staffController.getAllStaff);

router.get("/:id", staffController.getStaffById);

router.post("/new", utilities.isAdmin, staffValidator.addStaffRulesPOST(), staffValidator.checkStaffData, staffController.createStaff);

router.put("/update/:id", utilities.isAdmin, staffValidator.addStaffRulesPUT(), staffValidator.checkStaffData, staffController.updateStaffById);

router.delete("/delete/:id", utilities.isAdmin, staffController.deleteStaffById);



module.exports = router;