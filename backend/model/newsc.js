var mongoose = require("mongoose");

const schema = new mongoose.Schema({
name:String,
imageUrl: String,

})

const practice=mongoose.model("new",schema)
module.exports={practice};
