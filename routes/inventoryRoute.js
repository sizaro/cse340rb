// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const classController = require("../controllers/classContoller")


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

//Route to build car detail page by inventory Id
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId))

//Route to get to the inventory page
router.get("/", utilities.handleErrors(invController.deliverManagementView))

module.exports = router;