/**
 * document can be found on: http://expressjs.com/en/4x/api.html
 * For the purpose of simple tutorial, Postman service is used to mimic HTTP client requests 
 * Download Postman from: https://www.postman.com/
 * * * Sign up with free account and choose role as student 
 *  
 */


// npm install express 
const express = require('express');

// Initialize express framework 
const app = express();

// Create "ENDPOINTS" a.k.a. ROUTE HANDLERS
app.get('/', (req,res) => {
    res.send('Hello World from Express.js');    
});

// Start server on a PORT 
app.listen(3000, ()=> console.log(`Server running on 3000`));