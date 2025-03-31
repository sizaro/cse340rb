// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities")
const classController = require("../controllers/classContoller")
const baseController = require("../controllers/baseController")

router.get("/", utilities.handleErrors(baseController.buildHome))

//Route to add new classification
router.get("/newclassification", utilities.handleErrors(classController.newClassification))

router.post("/addnewclassification", utilities.handleErrors(classController.addNewClassification))

module.exports = router;