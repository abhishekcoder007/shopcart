import React, { useState, useEffect, useRef, useContext } from "react";

import axios from "axios";
import Card from "react-bootstrap/Card";
import NavBar from "../component/navBar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Searchbar from "../component/searchbar";
import { UserContext } from "../index.js";

function ProductPage() {
  const isFirstRender = useRef(true);
  const [show, setShow] = useState(false);
  const [rangeValue, setRangeValue] = useState(50);
  const [Category, setCategory] = useState("");
  const [data, setdata] = useState([]);
  const { globaldata, setglobaldata,searchdata,setsearchdata } = useContext(UserContext);
  // const [editdata, seteditdata] = useState({});
  const [editdata, seteditdata] = useState({});
  // const imageUrl = 'http://localhost:2024/images/file-1705495443343.png';
  const baseUrl = "http://localhost:2024/images";
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [rangeValues, setRangeValues] = useState([0, 10000]);

  // useEffect(()=>{

  //        setdata(globaldata?.data)

  // },[globaldata])

  async function fetchData() {
    const response = await axios.get("http://localhost:2024/product/add");
    if (response.data) setdata(response.data);
    console.log(response);
  }
  useEffect(() => {
    try {
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  async function handleDelete(delid) {
    console.log(delid);
    if (window.confirm(`product with id=${delid} is deleted`) == true) {
      const response = await axios.delete(
        `http://localhost:2024/product/delete/${delid}`
      );
      if (response?.data?.deletedCount == 1) {
        alert(`are you sure to delete`);
        fetchData();
      }
    } else {
      return;
    }
  }

  async function handleEdit(id) {
    try {
      const response = await axios.get(
        `http://localhost:2024/product/detail/${id}`
      );
      console.log(response);
      if (response.status === 200) {
        seteditdata({ ...response.data });
      }
      handleShow();
    } catch (err) {
      console.log(err);
    }
  }

  const handleChangeFile = (event) => {
    const name = event.target.name;
    const value = event.target.files[0];
    seteditdata((values) => ({ ...values, [name]: value }));
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    seteditdata((values) => ({ ...values, [name]: value }));
  };

  async function handleSubmitChange(event) {
    event.preventDefault();

    const formData = new FormData();

    // Append text fields to FormData
    formData.append("id", editdata._id);
    formData.append("Title", editdata.Title);
    formData.append("Price", editdata.Price);
    formData.append("Brand", editdata.Brand);
    formData.append("Category", editdata.Category);
    formData.append("DiscountPercentage", editdata.DiscountPercentage);
    formData.append("Rating", editdata.Rating);
    formData.append("Description", editdata.Description);

    formData.append("Images", editdata.Images);

    const response = await axios.post(
      "http://localhost:2024/product/update",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data) {
      alert("data updated");
      seteditdata({
        Title: "",
        Price: "",
        Brand: "",
        Category: "",
        DiscountPercentage: "",
        Rating: "",
        Description: "",
        Images: null,
      });
      handleClose();
      fetchData();
    }
    console.log(response);
  }
  async function handleSearch() {
    console.log(Category);
    try {
      const response = await axios.get(
        `http://localhost:2024/product/category/${Category}`
      );
      if (response.data) setdata([...response.data]);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  async function handlePriceSearch() {
    console.log(searchdata);
    let CategoryId=searchdata||Category
    const range1 = rangeValues[0];
    const range2 = rangeValues[1];
    console.log(range1);
    console.log(CategoryId);
    const obj = {CategoryId, range1, range2 };
    try {
      const response = await axios.post(
        `http://localhost:2024/product/price`,
        obj
      );
      if (response.data) setdata([...response.data]);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  const handleRangeChange = (values) => {
    setRangeValues([...values]);
    // handlePriceSearch()
  };
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    handlePriceSearch();
  }, [rangeValues]);

  useEffect(() => {
    // handleSearch();
    handlePriceSearch() ;
  }, [Category,searchdata]);

  function handleCategorySearch(e) {
    const data = e.target.value;
    setCategory(data);
    setsearchdata(data);
  }

  return (
    <div>
      <NavBar navcolor="success" />
      {/* {JSON.stringify(globaldata)} */}
      {/* <img src={imageUrl} alt="hello"/> */}
      {/* <img src='./my_img.jpeg' alt="hello"/> */}
      <div className="w-100 d-flex justify-content-between align-items-center shadow-md ">
        <div className="bg-secondary me-5">
          <select onChange={handleCategorySearch} className="w-100">
            <option value="all">Choose Category here</option>
            <option value="shoe">shoes</option>
            <option value="phone">phone</option>
            <option value="watch">watch</option>
            <option value="headphone">headphone</option>
            <option value="headphone">mobile headphone</option>
            <option value="all">produts all</option>
          </select>
        </div>

        <div className=" w-50 me-4 ">{<Searchbar />}</div>

        <div className="border  me-5 ">
          <label>Range</label>
          <Slider
            min={500}
            max={10000}
            value={rangeValues}
            onChange={handleRangeChange}
            step={1}
            marks={{ 0: "0", 5000: "5000", 10000: "10000" }}
            allowCross={false}
            range
          />
          <div className="mt-3">
            <p>
              Price: {rangeValues[0]} to {rangeValues[1]}
            </p>
          </div>
        </div>
      </div>
    

      {globaldata?.data.length > 0 ? (
        <>
          <div className="container">
            <div className="row">
              {globaldata?.data?.map((obj) => (
                <div key={obj.id} className="col-lg-3 mb-3">
                  <Card
                    className="shadow pt-1 bg-white border-outline-none"
                    style={{ width: "100%", height: "21rem" }}
                  >
                    <Card.Img
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "11rem",
                        objectFit: "cover",
                      }}
                      variant="top"
                      src={`${baseUrl}/${obj?.Images}`}
                    />
                    <Card.Body>
                      <Card.Title>{obj.Title}</Card.Title>
                      <Card.Text>Rs: {obj.Price}</Card.Text>
                      <div className="d-flex justify-content-between">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleDelete(obj._id)}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => handleEdit(obj._id)}
                        >
                          edit
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <div className="row">
              {data?.map((obj) => (
                <div key={obj.id} className="col-lg-3 mb-3">
                  <Card
                    className="shadow pt-1 bg-white border-outline-none"
                    style={{ width: "100%", height: "21rem" }}
                  >
                    <Card.Img
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "11rem",
                        objectFit: "cover",
                      }}
                      variant="top"
                      src={`${baseUrl}/${obj?.Images}`}
                    />
                    <Card.Body>
                      <Card.Title>{obj.Title}</Card.Title>
                      <Card.Text>Rs: {obj.Price}</Card.Text>
                      <div className="d-flex justify-content-between">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleDelete(obj._id)}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => handleEdit(obj._id)}
                        >
                          edit
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* edit form */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitChange}>
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    id="form6Example1"
                    className="form-control"
                    name="Title"
                    value={editdata?.Title}
                    onChange={handleChange}
                  />
                  <label className="form-label" for="form6Example1">
                    Title
                  </label>
                </div>
              </div>
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    id="form6Example2"
                    className="form-control"
                    value={editdata?.Price}
                    name="Price"
                    onChange={handleChange}
                  />
                  <label className="form-label" for="form6Example2">
                    Price
                  </label>
                </div>
              </div>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="text"
                id="form6Example3"
                className="form-control"
                name="Brand"
                value={editdata?.Brand}
                onChange={handleChange}
              />
              <label className="form-label" for="form6Example3">
                Brand
              </label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="text"
                id="form6Example4"
                className="form-control"
                value={editdata?.Category}
                name="Category"
                onChange={handleChange}
              />
              <label className="form-label" for="form6Example4">
                Category
              </label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="number"
                id="form6Example5"
                className="form-control"
                name="DiscountPercentage"
                value={editdata?.DiscountPercentage}
                onChange={handleChange}
              />
              <label className="form-label" for="form6Example5">
                DiscountPercentage
              </label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="number"
                id="form6Example6"
                className="form-control"
                name="Rating"
                value={editdata?.Rating}
                onChange={handleChange}
              />
              <label className="form-label" for="form6Example6">
                Rating
              </label>
            </div>

            {/* image  */}
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="file"
                id="form6Example67"
                className="form-control"
                accept="image/png"
                name="Images"
                // value={editdata?.Images}
                onChange={handleChangeFile}
              />
              <label className="form-label" for="form6Example67">
                Images
              </label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <textarea
                className="form-control"
                id="form6Example7"
                rows="4"
                name="Description"
                value={editdata?.Description}
                onChange={handleChange}
              ></textarea>
              <label className="form-label" for="form6Example7">
                Description
              </label>
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
    </div>
  );
}

export default ProductPage;
