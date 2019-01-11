/** Importing models */
const User = require("../models/user");
const Activity = require("../models/activities")

module.exports = (app) => {
    
    /*  Forcing login page for all routes */
    app.use("*", (req, res, next) => {
        if (req.cookies === undefined){
            console.log('NO COOKIES')
            
            res.redirect('/login');
            
        }
        next();
    })

    /*  Index */
    app.get('/', (req, res) => {
        console.log("HOME ROUTE")
        console.log(req.cookies)
        const currentUser = req.user;
        if (currentUser !== null) {

            User.findById({_id:currentUser._id})
                .then((user) => {
                    console.log(user)
                res.render("landing-page", {currentUser})
                }).catch(err => {
                    console.log(err)
                })
        } else {
            res.redirect('/login');
        }
    })

    app.post('/user/activity', (req, res) => {

    })
      
}
