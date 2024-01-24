var express=require("express");
var cor=require("cors");
var path=require("path");
var app=express();
const cheerio = require("cheerio");
var axios=require("axios");
require("./db/connection.js");
var productRoute=require("./routes/product.js");

const getImages = async (url) => {
    const imageList = [];
	const {data} = await axios.get(`${url}`);

    const $ = cheerio.load(data);
  
      
  try{
    $('img').each((i, image) => {
        const imageUrl = $(image).attr('src');
        if (imageUrl) {
          imageList.push(imageUrl);
        }
      });
     const List=  imageList.map(ele=>{
       if(ele.indexOf(url)>=0){
        console.log(ele)
        return ele
       }else{
        let text=`${url}${ele}`
        // console.log(text)
        return text
       }
      })
    //  console.log(List);
    //   console.log(imageList)
      return List;S
    } catch (err) {
     console.log(err)
    }
   


};

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


