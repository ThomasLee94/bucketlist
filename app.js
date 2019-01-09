/**
 * *******************
 * Project: BUCKETLIST
 * *******************
 */

/** Require npm packages */
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");


/** Run app.js as an instasnce of express */
let app = express();

/** Initialise cookieParser */
app.us(cookieParser());

/** Authentication with nToken*/
let checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    console.log(req.cookies);
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        console.log("not logged in");
        res.locals.currentUser = null;
        next();
    } else {
        console.log("loggedn in!");
        let token = req.cookies.nToken;
        let decodedToken = jwt.decode(token, {complete: true}) || {};
        console.log("Decoded Token", decodedToken);
        req.userId = decodedToken.payload._id; 
        res.locals.currentUser = decodedToken.payload; 
    }
}

/** Connecting to mongoose */
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bucketlist', { useNewUrlParser: true });
let db = mongoose.connection;

/** Use body-parser */
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

/** Use handlebars for client-side rendering */
app.engine("handlebars", handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

/**Port */
const port = process.env.PORT || 3000;
app.listen(port)

asdffas