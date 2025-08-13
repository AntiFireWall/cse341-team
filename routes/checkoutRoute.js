const express = require("express");
const router = new express.Router();
const checkoutValidator = require("../utilities/checkoutValidation");
const checkoutController = require("../controllers/checkoutController");
const utilities = require("../utilities/index");

router.get("/", checkoutController.getAllCheckout);

router.get("/:id", checkoutController.getCheckoutById);

router.post("/new", checkoutValidator.addCheckoutRulesPOST, checkoutValidator.checkCheckoutData, checkoutController.createCheckout);

router.put("/update/:id", checkoutValidator.addCheckoutRulesPUT, checkoutValidator.checkCheckoutData, checkoutController.updateCheckoutById);

router.delete("/delete/:id", checkoutController.deleteCheckoutById);



module.exports = router;