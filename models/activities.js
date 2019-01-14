/*  Initialise mongoose */
let mongoose = require("mongoose");
require("mongoose-double")(mongoose); 
let Schema = mongoose.Schema; 

let activitySchema = new Schema({
    title: String,
    description: String,
    longitude: {
        type: mongoose.Schema.Types.Double,
        required: true
    },
    latitude: {
        type: mongoose.Schema.Types.Double,
        required: true
    },
    address: String
});

/*  Generating the model for local resident */
let Activity = mongoose.model("Activity", activitySchema);

/*  Exporting Local to be used in routes */
module.exports = Activity; 