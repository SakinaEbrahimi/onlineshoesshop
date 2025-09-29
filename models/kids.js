const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const KidsSchema = new Schema({
   title: String,
   price: String,
   imageUrl: String,
   description: String,
   color: [],
   size: [],
   off: Number,
   userId:{
      type: Schema.Types.ObjectId,
      ref:"User"
   }
})
module.exports = Mongoose.model("Kids", KidsSchema)