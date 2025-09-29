const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const contactSchema = new Schema({
   email:String,
   description: String
})
module.exports = Mongoose.model("Contact", contactSchema)