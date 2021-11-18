/**
 * document can be found on: http://expressjs.com/en/4x/api.html
 * For the purpose of simple tutorial, Postman service is used to mimic HTTP client requests
 * Download Postman from: https://www.postman.com/
 * * * Sign up with free account and choose role as student
 * *** download the desktop app: https://www.postman.com/downloads/
 * *** This will allow us to test our backend without having to build a full frontend
 * *** once client is install use the web browser interface as normal *
 */

/*********************************************
 * IMPORT MODULES AND INITIALIZE EXPRESS
 * *******************************************
 */

// npm install express
const express = require("express");

// other modules
const path = require("path");

// Initialize express framework
const app = express();

// Initialize Body Parser Middleware to parse data sent by users in the request object
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // to parse HTML form data

/*******************************************
 * Example 1 - CREATE ROUTE HANDLERS EXAMPLE
 * *****************************************
 */

// Create "ENDPOINTS" a.k.a. ROUTE HANDLERS -- EXAMPLE 1
// app.get("/", (req, res) => {
//   //   res.send("<h1> Hello World from Express.js </h1>");
//   /**
//    * If you want to send a file which is a HTML page, use the code below
//    * However, this is not the best way, because you will have to create a route for every html page
//    */
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

/********************************************************
 * EXAMPLE 2 -- Creating a Static Website in express.js
 * ******************************************************
 * In this example we'll make the public folder static
 * That is, the purpose will be to serve html, css, and multi-media etc.
 * We will incorporate the method .use() which is used to create custom middleware
 * Making this folder static, you can add any amount of html and css in this folder and you do not have to create routes for them
 * compare this to what you did in node.js using .createServer() of the http module.
 * * Note -- you generally are not going to use express for static servers.
 * It is best suited to create JSON APIs or render templates to create dynamic web apps
 */
app.use(express.static(path.join(__dirname, "public")));

/*****************************************************************************
 * EXAMPLE -3 : CREATING ROUTES FOR A SIMPLE RESTful API USING HARDCODED DATA
 * ***************************************************************************
 */
/**
 * create some hardcoded array of objects in a separate file customers.js
 * Set it up for export
 * Import it here
 */
const customers = require("./customers");

/**
 * ./Create the route handle to return the above array as JSON
 * We will call this route with a GET request
 */
// app.get("/api/customers", (req, res) => {
//   res.json(customers);
// });

/*******************************************************************************************
 * EXAMPLE -4: GET A SINGLE CUSTOMER FROM THE CUSTOMER LIST
 * *******************************************************************************************
 */
// app.get("/api/customers/:id", (req, res) => {
//   res.json(
//     customers.filter((customer) => customer.id === parseInt(req.params.id))
//   );
// });

/**
 * Example -5: The Router Functionality
 * Purpose: Group all similar types of routes in a separate file (like /api/customers and /api/customers/:id etc)
 * Pre-requisite: In the root directory, create a sub-directory called routes.
 * Inside routes directory, create a sub-directory called api (since we are grouping api routes that is serving JSON data in this example)
 * Inside api directory create a file called customerRoutes.js
 * Copy paste the previous two routes in example 4 and 3 and paste it in the above file and then comment out the code lines from this file
 *
 */
/**
 * Import your router using app.use()
 * takes two params: the parent route string, require method with parameter of the file which contains all other routes
 * Since you are specifying the parent route here, you don't need to specify it in the routes of the route file
 *  */
// Customer API routes
app.use("/api/customers", require("./routes/api/customerRoutes.js"));

/**
 * Next 3 examples in the customerRoutes.js file
 * --create a customer, update a customer, and delete a customer
 */

/*********************************************************************************************
 * START YOUR SERVER
 * *******************************************************************************************
 */
// Start server on a PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
