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

/*******************************************
 * CREATE ROUTE HANDLERS EXAMPLE
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
 * We will call this route using POSTMAN with a GET request
 */
// app.get("/api/customers", (req, res) => {
//   res.json(customers);
// });

/*******************************************************************************************
 * EXAMPLE -4: CREATE A YOUR OWN MIDDLEWARE FUNCTION
 * *******************************************************************************************
 */
// import the middleware here:
const logger = require("./middleware/logger");

// initialize your middleware
app.use(logger);
app.get("/api/customers", (req, res) => {
  res.json(customers);
});

/*********************************************************************************************
 * START YOUR SERVER
 * *******************************************************************************************
 */
// Start server on a PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
