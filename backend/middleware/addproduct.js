


const productValidation=((req,res,next)=>{
    const data=req.body
    const file=req.file
    console.log({"file":req.file});
    console.log(req?.body);
    const Title=data?.Title
    const Price=data?.Price
    const Brand=data?.Brand
    const Category=data?.Category
    const DiscountPercentage=data?.DiscountPercentage
    const Rating=data?.Rating
    const Description=data?.Description
  if(!file){
        res.send("image field should not empty")
        return
    }
   if((Title== 'undefined')||
   (Price== 'undefined')
   ||(Brand== 'undefined')||
   (Category== 'undefined')||
   (DiscountPercentage== 'undefined')||
   (Rating== 'undefined')||
   (Description=='undefined' )){
    res.send("fieldS should not EMPTY");
    return;
   }


    if(!Title){
        console.log(Title)
        res.send("Title should not empty")
    
    }else if(!Price){
        res.send("PRICE should not empty")
    }else if(!Brand){
        res.send("Brand should not empty")
    }else if(!Category){
        res.send("Category should not empty")
    }else if(!DiscountPercentage){
        res.send("DiscountPercentage should not empty")
    }else if(!Description){
        res.send("Description should not empty")
    }else if(!Rating){
        res.send("Rating should not empty")
    }else if(!file){
        res.send("image field should not empty")
    }
    else if((typeof(Price)!=="number")&&(typeof(Brand)!=="string")&&(typeof(Category)!=="string")&&(typeof(DiscountPercentage)!=="number")&&(typeof(Rating)!=="number")&&(typeof(Description)!=="string")){
        res.send("invalid data , insert coorect data-type")
    }
    else{
        next()
    }
})




module.exports={productValidation}


