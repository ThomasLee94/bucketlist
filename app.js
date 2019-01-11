
 /* * ****************
 * Project: BUCKETLIST
 * ******************* 
 * */


/** Require npm packages */
// dotenv will be needed for secrets
require("dotenv").config()
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

/*  Run app.js as an instasnce of express */
let app = express();


app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
/*  Initialise cookieParser  */


/*  Authentication with nToken */
// let checkAuth = (req, res, next) => {
//     console.log("Checking authentication");
//     console.log(req.cookies);
//     if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
//         console.log("not logged in");
//         res.locals.currentUser = null;
        
//     } else {
//         console.log("loggedn in!");
//         let token = req.cookies.nToken;
//         let decodedToken = jwt.decode(token, {complete: true}) || {};
//         // console.log("Decoded Token", decodedToken);
//         req.userId = decodedToken.payload._id; 
//         res.locals.currentUser = decodedToken.payload; 
//     }
//     next();
// }

var checkAuth = (req, res, next) => {
    console.log("Checking authentication");

    if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
      req.user = null;
      console.log('HIT NO USER')
    } else {
        console.log(req.cookies)
      var token = req.cookies.nToken;
      var decodedToken = jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
      console.log('HIT - THERES A USER')
      console.log(req.user)
    }
  
   next()
  }


/*  Connecting to mongoose */ 
mongoose.connect('mongodb://localhost/bucketlist', { useNewUrlParser: true });
/* Checking or mongoose connection */
let db = mongoose.connection;
db.on("connected", () => {
    console.log("Success: connected to MongoDB");
})

/*  Use body-parser */ 


/*  Use handlebars for client-side rendering  */
app.engine("handlebars", handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");


app.use(checkAuth);


/*  Importing controllers */
require('./controllers/users')(app);
require('./controllers/auth')(app);


/*  Port */ 
const port = process.env.PORT || 3000;
app.listen(port)

