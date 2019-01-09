// Initialise mongoose
let mongoose = require("mongoose");
let Schema = mongoose.Schema; 

let activitySchema = new Schema({
    name: String,
    destination: String,
    tag: String
});

// Generating the model for local resident
let Activity = mongoose.model("Local", activitySchema);

// Exporting Local to be used in routes
module.exports = Activity; 