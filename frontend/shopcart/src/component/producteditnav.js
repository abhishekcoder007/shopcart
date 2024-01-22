import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Producteditnav() {
  const [show, setShow] = useState(false);
  //   const [data, setdata] = useState({});
  const [inputs, setInputs] = useState({});
  const [inputerr, setInputerr] = useState("");
  const navigate=useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeFile = (event) => {
  
    const name = event.target.name;
    const value = event.target.files[0];
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleChange = (event) => {
  
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    // Append text fields to FormData
    formData.append("Title", inputs.Title);
    formData.append("Price", inputs.Price);
    formData.append("Brand", inputs.Brand);
    formData.append("Category", inputs.Category);
    formData.append("DiscountPercentage", inputs.DiscountPercentage);
    formData.append("Rating", inputs.Rating);
    formData.append("Description", inputs.Description);
  
   
    formData.append("Images", inputs.Images);
  
    try {
      
      const response = await axios.post("http://localhost:2024/product/add", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
        );
 
     
      console.log(response);
      if(typeof(response.data)=="string"){
               alert(response.data)
      }
      if(response?.data?._id){
        alert("data is inserted successfully")
        setInputs({
          Title: "",
          Price: "",
          Brand: "",
          Category: "",
          DiscountPercentage: "",
          Rating: "",
          Description: "",
          Images: null, 
        })
        handleClose()
        handleShow()

      }
     
    } catch (error) {
     
      console.error(error);
    }
  };

  const handleMove=()=>{
    navigate("/product")
  }


  return (
    <>
      <Navbar
        expand="lg"
        className="d-flex justify-content-around align-items-center shadow-sm bg-secondary"
      >
        <Button variant="primary" onClick={handleShow}>
          Add Product
        </Button>
        <button type="button" onClick={handleMove} className="btn btn-primary">
          Edit Product
        </button>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}  encType="multipart/form-data">
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                <label className="form-label" for="form6Example1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="form6Example1"
                    className="form-control"
                    name="Title"
                    value={inputs?.Title} 
                    onChange={handleChange}
                  />
                 
                </div>
              </div>
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                <label className="form-label" for="form6Example2">
                    Price
                  </label>
                  <input
                    type="text"
                    id="form6Example2"
                    className="form-control"
                    name="Price"
                    value={inputs?.Price}
                    onChange={handleChange}
                  />
                
                </div>
              </div>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" for="form6Example3">
                Brand
              </label>
              <input
                type="text"
                id="form6Example3"
                className="form-control"
                name="Brand"
                value={inputs?.Brand}
                onChange={handleChange}
              />
           
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" for="form6Example4">
                Category
              </label>
              <input
                type="text"
                id="form6Example4"
                className="form-control"
                name="Category"
                value={inputs?.Category}
                onChange={handleChange}
              />
          
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" for="form6Example5">
                DiscountPercentage
              </label>
              <input
                type="number"
                id="form6Example5"
                className="form-control"
                name="DiscountPercentage"
                value={inputs?.DiscountPercentage}
                onChange={handleChange}
              />
           
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" for="form6Example6">
                Rating
              </label>
              <input
                type="number"
                id="form6Example6"
                className="form-control"
                name="Rating"
                value={inputs?.Rating}
                onChange={handleChange}
              />
          
            </div>

            {/* image  */}
            <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" for="form6Example67">
                Images
              </label>
              <input
                type="file"
                id="form6Example67"
                className="form-control"
                accept="image/png"
                name="Images"

                onChange={handleChangeFile}
              />
             
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" for="form6Example7">
                Description
              </label>
              <textarea
                className="form-control"
                id="form6Example7"
                rows="4"
                name="Description"
                value={inputs?.Description}
                onChange={handleChange}
              ></textarea>
            </div>

        

            <button
              data-mdb-ripple-init
              type="submit"
              className="btn btn-primary btn-block mb-4"
            >
              Submit
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Producteditnav;
