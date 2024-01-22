import React ,{useState,useContext}from 'react';
import axios  from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {UserContext} from "../index.js";

const Searchbar = () => {
        const[search,setsearch]=useState("");
      
        const {globaldata,setglobaldata}=useContext(UserContext)

        async function searchproduct(){
          let searchTerm=search.trim()
          if(searchTerm){
             const response=await axios.get(`http://localhost:2024/product/searchbar/?search_query=${searchTerm}`);
             console.log(response)
            
             setglobaldata(response)
             
             if(response.data.length<1){
              alert("Search item not found");
             }
          }else{
            setglobaldata({data:[]})
          }
        }


    const handleSearch=(e)=>{
        const searchdata=e.target.value
        setsearch(searchdata);
   

    }
  return (
    <div>
      <Container className="m-1">
      <Row>
        <Col sm={12}>
          <Form className="d-flex">
            <Form.Control
              type="search"
             
              className="rounded-pill"
              aria-label="Search"
              value={search} 
              placeholder="search product"
              onChange={handleSearch} 
            />
            <Button className="rounded-pill" onClick={searchproduct} variant="outline-primary">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    {/* {JSON.stringify(d)} */}
    </div>
  )
}

export default Searchbar
