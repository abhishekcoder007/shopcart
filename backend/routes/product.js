var express = require("express");
var router = express.Router();
var multer = require("multer");
var path = require("path");
var { productValidation,productUpdateValidation } = require("../middleware/addproduct.js");
var product = require("../controller/product.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, "file" + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get("/add", product.allProductData);

// router.get("/category/:id", product.categorySearch);
router.post("/price", product.querySearch);

router.post("/add",upload.single("Images"),productValidation,product.productAdd);

router.delete("/delete/:id", product.productDelete);

router.get("/detail/:id", product.productFindById);
router.get("/searchbar/", product.searchbar);
router.post(
  "/update",
  upload.single("Images"),  
  productUpdateValidation,
  product.editProduct
);
   


// for practice

router.post("/add/p", upload.single("image"), async (req, res) => {
  console.log(req.file);
  console.log(req.body.name);
  let { name } = req.body;
  let x = req.body;
  let imageUrl = req.file.filename;

  const newProduct = new practice({ ...x, imageUrl });
  await newProduct.save();
  res.send("hello");
});

module.exports = { router };
