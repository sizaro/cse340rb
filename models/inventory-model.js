const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}


/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
    try {
      const data = await pool.query(
        `SELECT * FROM public.inventory AS i 
        JOIN public.classification AS c 
        ON i.classification_id = c.classification_id 
        WHERE i.classification_id = $1`,
        [classification_id]
      )
      return data.rows
    } catch (error) {
      console.error("getclassificationsbyid error " + error)
    }
  }



  /* ***************************
 *  Get all car details from the inventory table by inventory_id
 * ************************** */  
async function getInventoryByInventoryId(inventory_id) {
    try {
      const data = await pool.query(
        `SELECT * FROM public.inventory AS i
        WHERE i.inv_id = $1`,
        [inventory_id]
      )
      console.log(data.rows)
      return data.rows
    } catch (error) {
      console.error("getinventorybyid error " + error)
    }
  }


  
//Insert Query for adding new car.
async function addNewCar(classification_id, inv_make, inv_model, inv_description, inv_image, inv_path, inv_price, inv_year, inv_miles, inv_color) {
  try {
      const result = await pool.query(
          `INSERT INTO public.inventory (classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
           RETURNING inv_id`,
          [classification_id, inv_make, inv_model, inv_description, inv_image, inv_path, inv_price, inv_year, inv_miles, inv_color]
      );

      console.log("New car added with ID:", result.rows[0].inv_id);
      return result.rows[0].inv_id; 
  } catch (error) {
      console.error("Error adding new car: " + error);
      throw error; 
  }
}

module.exports = {getClassifications, getInventoryByClassificationId, getInventoryByInventoryId, addNewCar}