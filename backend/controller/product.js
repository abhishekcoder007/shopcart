
var { addProduct, data } = require("../model/product.js");

const productAdd=async (req, res) => {
    console.log(req.body);
    const data=req.body
    const Images=req?.file?.filename
    if(!(req?.file)){
        res.send("image field is empty");
        return
    }
    const conn =new addProduct({...data,Images});
   await conn.save();
    res.send(conn);
  }

 const productDelete= async (req,res)=>{
    const id =req.params.id
  
    const response= await addProduct.deleteOne({_id:`${id}`})
  
    res.send(response)
  
  }

  //edit 
  const editProduct=async (req,res)=>{

    let bodyData=req.body
    let id=req.body.id
    // console.log(req.file)
    // console.log(req.body)
    if(req?.file?.filename){
      let  Images=req.file.filename;
      const data = await addProduct.updateOne({_id:`${id}`},{$set:{...bodyData,Images}});
      res.send(data)
  
    }
    else{
      const data = await addProduct.updateOne({_id:`${id}`},{$set:{...bodyData}});
      res.send(data)
    }
  
  
  };



const searchbar = async (req, res) => {
 
    const searchTerm = req.query.search_query
    // req.params.id;

    if((searchTerm=="")||(searchTerm==null)){
          res.send({data:"dont enter empty value"});
    }else{
      try {
    const results = await addProduct.find({ $text: { $search: searchTerm } });

    console.log({ results });
    res.send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}
};


const allProductData= async (req, res) => {
  try {
    const data = await addProduct.find({});
    res.send(data );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}


const categorySearch= async (req, res) => {
  const id=req.params.id

  try {
    if(id=="all"){
      const data = await addProduct.find();
      res.send(data );
    }else{
    const data = await addProduct.find({Category:`${req.params.id}`});
    res.send(data );
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

const priceSearch= async (req, res) => {
  try {
    const pricedata=req?.body
  const data = await addProduct.find({Price:{ $gte:pricedata.range1, $lte: pricedata.range2 }});
    res.send(data );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

const productFindById=async (req,res)=>{
  const id=req.params.id
    const data = await addProduct.findOne({_id:`${id}`});
    
    res.send(data);
  
  }




  module.exports={productAdd,productDelete,editProduct,searchbar,allProductData,categorySearch,priceSearch,productFindById}