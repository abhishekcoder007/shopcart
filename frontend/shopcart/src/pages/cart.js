import React, { useState, useEffect, useContext } from "react";

import Card from "react-bootstrap/Card";
import NavBar from "../component/navBar";
import { UserContext } from "../index.js";

const Cart = () => {
  const { cartdata, setcartdata } = useContext(UserContext);
  const baseUrl = "http://localhost:2024/images";
  function removecart(id) {
    const filterdata = cartdata?.filter((ele) => ele._id != id);
    setcartdata(filterdata);
  }
  function addCart(id) {
    const cartproduct = cartdata?.map((ele) => {
      if (ele._id == id) {
        let count = ele.Productcount + 1;
        return { ...ele, Productcount: count };
      } else {
        return ele;
      }
    });

    setcartdata(cartproduct);
  }
  function deletecountCart(id) {
    const cartproduct = cartdata?.map((ele) => {
      if (ele._id == id) {
        let count = ele.Productcount - 1;
        if (count < 1) {
          count = 0;

          alert("count should not negative");
          return { ...ele, Productcount: 1 };
        } else {
          return { ...ele, Productcount: count };
        }
      } else {
        return ele;
      }
    });

    setcartdata(cartproduct);
  }

  return (
    <div>
      <NavBar navcolor="success" />
      {/* <p>{JSON.stringify(data[0])}</p> */}
      {/* <img src={imageUrl} alt="hello"/> */}
      {/* <img src='./my_img.jpeg' alt="hello"/> */}

      <div className="container">
        <div className="row">
          {cartdata?.map((obj) => (
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
                  <Card.Title>count:-{obj.Title}</Card.Title>
                  <Card.Text>Rs: {obj.Price}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      onClick={() => addCart(obj?._id)}
                      className="btn btn-primary"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => deletecountCart(obj?._id)}
                      className="btn btn-primary"
                    >
                      -
                    </button>
                    <button type="button" className="btn btn-primary">
                      count:-{obj.Productcount}
                    </button>
                    <button
                      type="button"
                      onClick={() => removecart(obj?._id)}
                      className="btn btn-success"
                    >
                      delete
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
};

export default Cart;
