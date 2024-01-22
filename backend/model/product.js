var mongoose = require("mongoose");
const data = {
  Brand: "apple",
  Category: "phone",
  Description: "8 gb storage",
  DiscountPercentage: 2,
  Images: "C:\\fakepath\\Screenshot 2023-11-19 161908.png",
  Price: 560,
  Rating: 5,
};

const schema = new mongoose.Schema({
  Title: {
    type: String,
  },
  Brand: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  DiscountPercentage: {
    type: Number,
    required: true,
  },
  Images: {
    type: String,
    required: true,
  },

  Price: {
    type: Number,
    required: true,
  },
  Rating: {
    type: Number,
    required: true,
  },
});
const addProduct = mongoose.model("products", schema);

const addProductCollection = addProduct.collection;

 addProductCollection.dropIndexes((err, result) => {
  if (err) {
    console.error("Error dropping indexes:", err);
  } else {
    console.log("Indexes dropped successfully:", result);

    addProductCollection.createIndex(
      { Description: "text", Title: "text", Brand: "text" },
      { name: "Description_text_index" },
      (err, result) => {
        if (err) {
          console.error("Error creating index:", err);
        } else {
          console.log("Index created successfully:", result);
        }
      }
    );
  }
});

module.exports = { addProduct, data };
