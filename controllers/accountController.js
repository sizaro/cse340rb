require("dotenv").config()
const utilities = require("../utilities")
const acctModel = require("../models/account-model")
const bcrypt = require("bcryptjs")

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLoginView(req, res, next) {
    let nav = await utilities.getNav()
    //const loginForm = await utilities.buildLoginForm()
    res.render("account/login", {
      title: "Login",
      nav,
      errors: null,
      //loginForm
    })
  }



  /* ****************************************
*  Deliver Register view
* *************************************** */
async function buildRegisterView(req, res, next) {
  let nav = await utilities.getNav()
  //let RegisterForm = await utilities.buildRegisterForm()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  })
}


/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body


  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }

  const regResult = await acctModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
      errors: null
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
      errors: null
    })
  }
}


module.exports = {buildLoginView, buildRegisterView, registerAccount}