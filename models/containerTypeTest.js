// This container header defines that attributes of locations where inventory can be contained.
// Containers can be fixed locations such as a shelf location in a wearhouse or in a mobile vehicle
// such as a van or a service truck, or it can be a mobile location such as a cart or a tote,
// shipping carton.
//
// The container type will define all the attrubutes we need to know about a conbainer.
//
// Containers will also represent 'virtual' containers such as sales orders, picklists, and job tickets.
//TODO: Review with Todd to see if this is even necessary.  All of this could be in the caontainer objects themselves.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContainerTypeSchema = new Schema({
  //TODO: build out container attributes and types
  account_id : {
    type : String
  },
  type: {
    //Defines what type of container this is. This will drive business rules around the container use.
    type: String,
    enum: ["fixed", "mobile", "workstation", "shipping"],
    default: "fixed",
  },
});

module.exports = mongoose.model("ContainerType", ContainerTypeSchema);
