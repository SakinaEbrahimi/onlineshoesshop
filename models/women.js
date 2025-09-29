const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const WomenSchema = new Schema({
   title: String,
   price: String,
   imageUrl: String,
   description: String,
   off: String,
   color: [],
   size: [],
   userId:{
      type: Schema.Types.ObjectId,
      ref:"User"
   }
})
module.exports = Mongoose.model("Women", WomenSchema)