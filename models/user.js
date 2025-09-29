const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const UserSchema = new Schema({
   email: {
      type:String,
      require:true
   },
   password: {
      type: String,
      require: true
   },
   resetToken : String,
   resetExpira: Date,
   cart: { items:[{
      womenId: {
         type: Schema.Types.ObjectId,
         ref: 'Women'
      },
      quantity: Number
   }]}
})

UserSchema.methods.addToCart = function(women){
   const womenIndex = this.cart.items.findIndex((p)=>{
      return p.womenId.toString() == women._id.toString()
   })

   const updatedCartItems =[...this.cart.items];
   let newQuantity = 1;

   if(womenIndex >= 0){
      //update
      newQuantity = updatedCartItems[womenIndex].quantity+1;
      updatedCartItems[womenIndex].quantity = newQuantity
   }
   else{
      // add new element
      updatedCartItems.push({
         womenId: women._id,
         quantity: newQuantity
      })
   }

   this.cart.items = updatedCartItems

   return this.save();
}

UserSchema.methods.removeFromCart = function(proId){
   const updatedCartItems = this.cart.items.filter(( i =>{
      return i.womenId.toString() !== proId.toString()
   }))

   this.cart.items = updatedCartItems;
   return this.save()
}
UserSchema.methods.clearCart = function (){
   this.cart = {cartItems: []};
   return this.save()
 }
 
module.exports = Mongoose.model("User", UserSchema)