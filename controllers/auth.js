/** Importing models */
const Activity = require("../models/activities");
const User = require("../models/user");
const jwt = require('jsonwebtoken');

module.exports = (app) => {
    /* SIGN UP POST */
    app.post("/sign-up", (req, res) => {
        /* Checking if password matching confirm password */    
        if (req.body.password === req.body.confirmPassword){
            /*  Create User and JWT */
            const user = new User({email: req.body.email, name: req.body.name, password: req.body.password});
            user.save().then(user => {
                    console.log(user)
                    let token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.SECRET, { expiresIn: "60 days" });
                    res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
                    let newToken = req.cookies.nToken;
                    let decodedToken = jwt.decode(newToken, { complete: true }) || {};
                    res.redirect("/");
                }).catch(err => {
                    console.log(err.message);
                    return res.status(400).send(err.message);
                });
        } 

    });

    /*  SIGN UP GET */
    app.get("/sign-up", (req, res) => {
        res.render("sign-up")
    })

    /*  LOGIN FORM */
    app.get('/login', (req, res) => {
        res.render("login");
    });

    /* LOGIN */
    app.post("/login", (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        /*  Find this user name */
        User.findOne({ email }, "name email password")
        .then(user => {
            /*  Create a token */
            const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.SECRET, {
                expiresIn: "60 days"
            });
            /*  Set a cookie and redirect to root */
            res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
            res.redirect("/");
        
        })
        .catch(err => {
            console.log(err);
        });
    });

    /*  LOGOUT */
    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    });


  }