/**
 * In this file, we will group all the /api/customers routes instead of listing them in the index.js file
 * This is a tutorial of how to use Express framework's route functionality.
 *
 */
/**
 * ./Create the route handle to return the above array as JSON
 * We will call this route with a GET request
 */

/**
 * Import express
 */
const express = require("express");
const router = express.Router();

/**
 * Also we are referring to the customers array which is in the customers.js file
 * So we need to import that here
 */
const customers = require("../../customers");

/**
 * Now, when you create the routes, instead of coding app.get()
 * You will code - router.get()
 */
router.get("/", (req, res) => {
  res.json(customers);
});

/*******************************************************************************************
 * EXAMPLE -4: GET A SINGLE CUSTOMER FROM THE CUSTOMER LIST
 * *******************************************************************************************
 */
router.get("/:id", (req, res) => {
  const foundCustomer = customers.some(
    (customer) => customer.id === parseInt(req.params.id)
  );

  if (foundCustomer) {
    res.json(
      customers.filter((customer) => customer.id === parseInt(req.params.id))
    );
  } else {
    res
      .status(400)
      .json({ msg: `No customer found with requested id of ${req.params.id}` });
  }
});

/**
 * Example -6: Create a new customer
 * NOTE: Example 5 is tutorial on how to use Router functionality of Express and is in the index.js file
 * Since user will send data, we handle this with a .post() method instead of .get()
 * NOTE -- We can specify the same routes AS LONG AS the http methods are different i.e. one is .get() and other is .post()
 * we will test this out using the POSTMAN API service online (https://www.postman.com/)
 * In POSTMAN, select a POST request, goto header tab; set key as content-type and value as application/json
 * then select body tab, select raw, and add a JSON item that you want to add to the customers
 */
// router.post("/", (req, res) => {
//   res.send(req.body); // if we test this using POSTMAN, you will see the response is empty
// });

/**
 * IMPORTANT -- To parse the body of the request object, we need a body parser that comes with Express framework
 * First initialize the body parser in the index.js file as a middleware function
 * Now if send the POST request again you will get result back.
 * Now comment out the previous line, and use the following code
 */
router.post("/", (req, res) => {
  const newCustomer = {
    id: req.body.id,
    name: req.body.name, // we can do this since we are using the body parser
    email: req.body.email,
    status: "active",
  };

  // First validate name and email parameters are not empty
  if (!newCustomer.id || !newCustomer.name || !newCustomer.email) {
    return res
      .status(400)
      .json({ msg: "You cannot have id, email or name parameters empty" });
  }

  // insert into existing array
  customers.push(newCustomer);

  // return the entire array with the new member
  res.json(customers);
});

/**
 * Update a existing customer with a .put() request -- router.put()
 * Delete a existing customer with a .delete() request -- router.delete()
 *
 */

//Export the router object
module.exports = router;
