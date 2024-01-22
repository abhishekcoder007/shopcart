import React from "react";
import Producteditnav from "../component/producteditnav";
import NavBar from "../component/navBar";


const Edit = () => {
  return (
    <div>
      <div className=" mb-5 shadow-sm">
        <NavBar navcolor="success" />
      </div>
      <div>
        <Producteditnav />
      </div>
    </div>
  );
};

export default Edit;
