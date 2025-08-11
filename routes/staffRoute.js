const express = require('express');
const router = express.Router();
const utilities = require('../utilities');
const staffController = require('../controllers/staffController');
const staffValidation = require('../utilities/staffValidation'); // Adjust the path as needed

/**
 * @swagger
 * /staff/new:
 *   post:
 *     summary: Create a new staff member
 *     description: This endpoint creates a new staff member in the library system.
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NewStaffMember'
 *     responses:
 *       201:
 *         description: Staff member created successfully
 */
router.post("/new", 
  staffValidation.addStaffRules(),  // Use validation rules
  staffValidation.checkStaffData,   // Use the middleware to check for errors
  utilities.handleErrors(staffController.createStaff)
);

module.exports = router;