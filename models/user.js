/*  Initialise mongoose */
let mongoose = require("mongoose");
let Schema = mongoose.Schema; 

let userSchema = new Schema({
    name: String,
    destination: String,
    tag: String,
    email: { type: String, unique: true },
    password: String
});

/*  Generating the model for local resident */
let User = mongoose.model("User", userSchema); 

/*  Exporting Local to be used in routes */
module.exports = User; 