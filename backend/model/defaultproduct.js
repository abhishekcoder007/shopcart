// var mongoose = require("mongoose");


// const productSchema = new mongoose.Schema({
//   id: {
//     type: Number,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     index:true,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   discountPercentage: {
//     type: Number,
//     required: true,
//   },
//   rating: {
//     type: Number,
//     required: true,
//   },
//   stock: {
//     type: Number,
//     required: true,
//   },
//   brand: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   thumbnail: {
//     type: String,
//     required: true,

//   },
//   images: {
//     type: [String],
//     required: true,
//   },
// });



// const addDefaultProduct = mongoose.model("defaultproducts", productSchema);
// module.exports={addDefaultProduct}