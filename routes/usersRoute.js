const express = require("express");
const router = new express.Router();
const usersController = require("../controllers/usersController");
const usersValidator = require("../utilities/usersValidation")
const utilities = require("../utilities/index");

router.get("/", usersController.getAllUsers);

router.get("/:id", usersController.getUserById);

router.post("/new", utilities.isAdmin, usersValidator.addUserRulesPOST(), usersValidator.checkUserData, usersController.createUser);

router.put("/update/:id", utilities.isAdmin, usersValidator.addUserRulesPUT(), usersValidator.checkUserData, usersController.upadteUserById);

router.delete("/delete/:id", utilities.isAdmin, usersController.deleteUserById);



module.exports = router;