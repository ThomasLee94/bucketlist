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

    /* Create activity form */
    app.get('/activity-create', (req, res) => {
        const currentUser = req.user;
        console.log(currentUser)
        res.render('create-activity-form', {currentUser})
    })
    /* Create activity POST */
    app.post('/:user/activity', (req, res) => {
        Activity.create(req.body)
            .then((activity) => {
                res.redirect("/")
            })
    })

    /* Show all activities */
    app.get('/activities', (req, res) => {
        Activity.find()
            .then((activities) => {
                res.render('activities', {activities})
            })
        
    })
      
}
