// Initialise mongoose
let mongoose = require("mongoose");
let Schema = mongoose.Schema; 

let localSchema = new Schema({
    name: String,
    destination: String
});

// Generating the model for local resident
let Local = mongoose.model("Local", localSchema);

// Exporting Local to be used in routes
module.exports = Local; 