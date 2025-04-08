const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  console.log(data[0])
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}


 /* ***************************
 *  Build car Details by inventory id view
 * ************************** */

 invCont.buildByInventoryId = async function (req, res, next) {
    const inventory_id = req.params.inventoryId
    const data = await invModel.getInventoryByInventoryId(inventory_id)
    console.log(data)
    const vehicleTemplate = await utilities.buildCarDetailsDisplay(data[0])
    let nav = await utilities.getNav()
    console.log("Vehicle Make:", data[0].inv_make);
    console.log("Vehicle Model:", data[0].inv_model);
    const vehicleMake = data[0].inv_make;
    const vehicleModel = data[0].inv_model
    res.render("./inventory/type", {
      title:`${vehicleMake} ${vehicleModel}`,
      nav,
      vehicleTemplate,
    })
  }
  

/**********
 
Build and Deliver management view
 
*********/

invCont.deliverManagementView = async function (req, res) {
  const nav = await utilities.getNav()
  const vehicleManagement = await utilities.vehicleManagement()
  res.render("inventory/management", 
    {
      title:"Vehicle Management",
      nav,
      vehicleManagement

    }
  )
}


//handling displaying the car form

invCont.newCar = async function(req,res) {
  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList()
  res.render("inventory/newcarform",{
          title:"Add New Vehicle",
          nav,
          errors:null,
          classificationList
      }
  )
}



//handling the adding new car to the database.

invCont.addNewCar = async function (req, res) {
  let nav = await utilities.getNav();
  let classificationList = await utilities.buildClassificationList()
  //let classificationSelect = await utilities.buildAddClassification()
  const vehicleManagement = await utilities.vehicleManagement()
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color
  } = req.body;

  try {
    // Call the model function to insert a new car record
    const carResult = await invModel.addNewCar(
      classification_id,
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color
    );

    if (carResult) {
      req.flash(
        "notice",
        `Successfully added the new car: ${inv_make} ${inv_model}.`
      );
      res.status(201).render("inventory/management", {
        title: "Vehicle Management",
        nav,
        //classificationSelect,
        vehicleManagement,
        errors: null
      });
    } else {
      req.flash("notice", "Failed to add the new car. Please try again.");
      res.status(501).render("inventory/newcarform", {
        title: "Add New Car",
        nav,
        errors: null,
        classificationList
      });
    }
  } catch (error) {
    console.log("Error while adding new car:", error);
    req.flash("notice", "An error occurred while adding the car.");
    res.status(500).render("inventory/newcarform", {
      title: "Add New Car",
      nav,
      errors: null,
      classificationList
      
    });
  }
}

module.exports = invCont