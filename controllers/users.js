/** Importing models */
const User = require("../models/user");

module.exports = (app) => {
    // * Routes

    // * Forcing login page for all routes. 
    app.use("*", (req, res, next) => {
        if(req.cookies.nToken){
            next();
        } else {
            res.redirect("/login");
        }
    })

    // * Index
    app.get('/', (req, res) => {
        const user = res.locals.currentUser;
        if (user !== null) {
            User.find()
                .then((skills) => {
                res.render("activities-index", {activity: activity})
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
