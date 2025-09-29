const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const productSchema = new Schema({
   title: String,
   price: String,
   imageUrl: String,
   description: String,
   adminId:{
      type: Schema.Types.ObjectId,
      ref:"Admin"
   },
   categoryId:{
      type: Schema.Types.ObjectId,
      ref:"Category"
   }
})
module.exports = Mongoose.model("Product", productSchema)