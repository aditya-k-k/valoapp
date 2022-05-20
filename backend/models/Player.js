mongoose=require('mongoose')
const { Schema } = mongoose;

const player = new Schema({
  UserID:  String, // String is shorthand for {type: String}
  Username: String,
  Password:   String,

});
Player=mongoose.model('Player',player)
module.exports=Player