// //Needed resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')

// //Route to get the login page
router.get("/login", utilities.handleErrors(accountController.buildLoginView))

//Route to get the register page
router.get("/signup", utilities.handleErrors(accountController.buildRegisterView))

//Route to get make registration
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )



module.exports = router;