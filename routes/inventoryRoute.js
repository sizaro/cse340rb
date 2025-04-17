// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const updateValidate = require("../utilities/inventory-validation")
const classController = require("../controllers/classContoller")
const checkEmployeeOrAdmin = require("../utilities")
const validate = require("../utilities/account-validation")

// Public route - classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

//Public route - inventory detail
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId))

//Protected - inventory management view
router.get("/", checkEmployeeOrAdmin.checkEmployeeOrAdmin, utilities.handleErrors(invController.deliverManagementView))

// Protected - JSON data for inventory management
router.get("/getInventory/:classification_id", checkEmployeeOrAdmin.checkEmployeeOrAdmin, utilities.handleErrors(invController.getInventoryJSON))

// Protected - edit inventory
router.get("/edit/:inv_id", checkEmployeeOrAdmin.checkEmployeeOrAdmin, utilities.handleErrors(invController.editInventoryItem))

// Protected - update inventory
router.post("/update/", 
  checkEmployeeOrAdmin.checkEmployeeOrAdmin, 
  updateValidate.UpdateInventoryRules(), 
  updateValidate.CheckUpdateData, 
  utilities.handleErrors(invController.updateInventory)
)

// Protected - delete form
router.get("/delete/:inv_id", checkEmployeeOrAdmin.checkEmployeeOrAdmin, utilities.handleErrors(invController.deleteInventoryItem))

// Protected - process delete
router.post("/delete/", checkEmployeeOrAdmin.checkEmployeeOrAdmin, utilities.handleErrors(invController.deleteInventory))

// get a dealer form for contact
router.get("/dealer/:inv_id", utilities.handleErrors(invController.dealerForm))

//submit feedback route
router.post("/feedback/", updateValidate.FeedbackValidationRules(),updateValidate.CheckUpdateData, utilities.handleErrors(invController.submitFeedback))

// Protected - view feedback list
router.get("/feedbackList", checkEmployeeOrAdmin.checkEmployeeOrAdmin, utilities.handleErrors(invController.showFeedbackPage))

module.exports = router;
