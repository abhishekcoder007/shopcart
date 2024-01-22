import React from 'react'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';

function NavBar(props) {
let navcolor=props?.navcolor || "light"
  return (
    <>
    
      {[ 'lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className={`bg-${navcolor} mb-3`}>
          <Container fluid>
            <Navbar.Brand href="#">ShopCart</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                 <Link className="text-decoration-none" to="/" ><Nav.Link href="#action1">Home</Nav.Link></Link>
                 <Link className="text-decoration-none" to="/product" ><Nav.Link href="#action1">Product</Nav.Link></Link>
                 <Link className="text-decoration-none"  to="/edit" ><Nav.Link href="#action1">Edit</Nav.Link></Link>
                 <Link className="text-decoration-none"  to="/cart" ><Nav.Link href="#action1">Cart</Nav.Link></Link>
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}





export default NavBar;
