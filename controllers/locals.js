/** Importing models */
const Local = require("../models/local");

module.exports = (app) => {
    /** Routes */

    // Forcing login page for all routes. 
    app.use("*", (req, res, next) => {
        if(req.cookies.nToken){
            next();
        } else {
            res.redirect("/login");
        }
    })

    /** Index */
    app.get('/', (req, res) => {
        const user = res.locals.currentUser;
        if (user !== null) {
            Local.find()
                .then((skills) => {
                res.render("skills-index", {skills: skills})
                }).catch(err => {
                    console.log(err)
                })
        } else {
            res.redirect('/login');
        }
    })

    /** Showing all users for a specific skill*/
    app.get('/skills/:id', (req, res) => {
        // Display all approved users for skill x once they click the apply button.
        let info = {new: false, userId: req.userId}
        Skill.findById(req.params.id)
        .then((skill) => {
            info.skill = skill
            return Relationship.findOne({userId: req.userId, skillId: req.params.id})
        })
        .then(relationship => {
            if(!relationship){
                info.new = true;
            }
            return Relationship.find({skillId: req.params.id}).populate("userId")
        })
        .then(users => {
            info.users = users
            res.render("skills-show", info)
        }).catch(err => {
            console.log(err)
        })
    })

      
}
