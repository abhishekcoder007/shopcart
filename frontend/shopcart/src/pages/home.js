import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import NavBar from "../component/navBar";
import { UserContext } from "../index.js";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setdata] = useState([]);
  const baseUrl = "http://localhost:2024/images";
  const { cartdata, setcartdata } = useContext(UserContext);
  const navigate=useNavigate();
  function addCart(id) {
    const product = data?.find((ele, index) => ele._id == id);
    const cartproduct = cartdata?.find((ele) => ele._id == id);
    const cartproductindex = cartdata?.findIndex((ele) => ele.Productcount);
    if (product) {
      console.log(cartproduct?.Productcount);
      if (cartproduct?.Productcount) {
        console.log("hello");
        let count = cartproduct.Productcount + 1;
        console.log(count);
        let element = { ...cartproduct, Productcount: count };
        setcartdata((old) => [...old, element]);
        const deletedata = cartdata.splice(cartproductindex, 1);
        console.log(deletedata);
      } else {
        let element = { ...product, Productcount: 1 };
        setcartdata((old) => [...old, element]);
        console.log(element);
      }
    }
    console.log(cartdata);
  }

  function buyNow(id) {
    const product = data?.find((ele, index) => ele._id == id);
    const cartproduct = cartdata?.find((ele) => ele._id == id);
    const cartproductindex = cartdata?.findIndex((ele) => ele.Productcount);
    if (product) {
      console.log(cartproduct?.Productcount);
      if (cartproduct?.Productcount) {
        console.log("hello");
        let count = cartproduct.Productcount + 1;
        console.log(count);
        let element = { ...cartproduct, Productcount: count };
        setcartdata((old) => [...old, element]);
        const deletedata = cartdata.splice(cartproductindex, 1);
        console.log(deletedata);
        navigate("/cart")
      } else {
        let element = { ...product, Productcount: 1 };
        setcartdata((old) => [...old, element]);
        console.log(element);
        navigate("/cart")
      }
    }
    console.log(cartdata);

  }
  useEffect(() => {
    try {
      async function fetchData() {
        const response = await axios.get("http://localhost:2024/product/add");
        if (response.data) setdata(response.data);
        console.log(response);
      }
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <NavBar navcolor="success" />

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
                  style={{ width: "100%", height: "11rem", objectFit: "cover" }}
                  variant="top"
                  src={`${baseUrl}/${obj?.Images}`}
                />
                <Card.Body>
                  <Card.Title>{obj.Title}</Card.Title>
                  <Card.Text>Rs: {obj.Price}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      onClick={() => buyNow(obj?._id)}
                      className="btn btn-primary"
                    >
                      Buy Now
                    </button>
                    <button
                      type="button"
                      onClick={() => addCart(obj?._id)}
                      className="btn btn-success"
                    >
                      Add Cart
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
