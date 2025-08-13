const express = require("express");
const router = new express.Router();
const usersController = require("../controllers/usersController");
const utilities = require("../utilities/index");

router.get("/", usersController.getAllUsers);

router.get("/:id", usersController.getUserById);

router.delete("/delete/:id", usersController.deleteUserById);



module.exports = router;