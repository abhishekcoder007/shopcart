var express=require("express");
var cor=require("cors");
var path=require("path");
var app=express();
const cheerio = require("cheerio");
var axios=require("axios");
require("./db/connection.js");

var productRoute=require("./routes/product.js");

var {getImages}=require("./custom_functions/scrap.js")



app.use(express.json())
app.use(cor());
app.use('/images', express.static(path.join(__dirname, 'images')));
console.log(path.join(__dirname, 'images'));


app.use("/product",productRoute.router)

app.get("/scrap",async (req,res)=>{

   const response=await  getImages(req.query.url);
    
   res.send(response);
})
app.listen(2024,(err)=>{
    if(!err){
        console.log("server started ...");
    }else{
        console.log(err);
    }
})


