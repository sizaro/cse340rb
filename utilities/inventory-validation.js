const InvModel = require("../models/account-model")
const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

// inventory rules for incoming update inventory data
validate.UpdateInventoryRules = () => {
    return [
      body("inv_id")
        .trim()
        .notEmpty()
        .withMessage("Vehicle ID is required."),
  
      body("inv_make")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .matches(/^[a-z]{3,}$/)
        .withMessage("Make should contain only lowercase letters, at least 3 characters, no spaces."),
  
      body("inv_model")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .matches(/^[A-Za-z]{3,}$/)
        .withMessage("Model should contain only letters, at least 3 characters, no spaces."),
  
      body("inv_year")
        .trim()
        .notEmpty()
        .matches(/^\d{4}$/)
        .withMessage("Year must be a valid 4-digit number."),
  
      body("inv_description")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Description must be at least 3 characters long."),
  
      body("inv_price")
        .trim()
        .notEmpty()
        .isFloat({ min: 0 })
        .withMessage("Price must be a number greater than or equal to 0."),
  
      body("inv_miles")
        .trim()
        .notEmpty()
        .matches(/^\d+$/)
        .withMessage("Miles must be a number."),
  
      body("inv_color")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .matches(/^[A-Za-z]{3,}$/)
        .withMessage("Color must be at least 3 letters with no numbers or symbols."),
  
      body("inv_image")
        .trim()
        .notEmpty()
        .matches(/^\/images\/vehicles\/no-image\.jpg$/)
        .withMessage("Image path must be exactly '/images/vehicles/no-image.jpg'."),
  
      body("inv_thumbnail")
        .trim()
  
        .notEmpty()
        .matches(/^\/images\/vehicles\/no-image\.jpg$/)
        .withMessage("Thumbnail path must be exactly '/images/vehicles/no-image.jpg'.")
    ];
  };

  

// check for data errors and render view
validate.CheckUpdateData = async (req, res, next) => {
    const {
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_price,
      inv_miles,
      inv_color,
      inv_image,
      inv_thumbnail
    } = req.body;
  
    let errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav();
      let itemName = `${inv_make} ${inv_model}`;
      res.render("inventory/editinventory", {
        title: "Edit " + itemName,
        nav,
        errors,
        inv_id,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_price,
        inv_miles,
        inv_color,
        inv_image,
        inv_thumbnail
      });
      return;
    }
  
    next();
  };
  

module.exports = validate