import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Card from "react-bootstrap/Card";

function ScrapPage() {
  const [show, setShow] = useState(false);
  const [url, seturl] = useState("");
  const [data,setdata]=useState([])
//  for modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleSubmit(e){
  e.preventDefault();
  
    const response = await axios.get(`http://localhost:2024/scrap?url=${url}`);
    if(response?.data?.error){
      console.log(response.data);
      alert(response.data.error)
      return
    }
    if (response.data) setdata(response.data);
    console.log(response);
    handleClose()

  }


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Click for Scraping
      </Button>
     {/* <div>Scraping for url:-{url}</div> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter url here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <form>
            <input type="text" className='rounded shadow-lg w-100' onChange={(e)=> seturl(e.target.value)}/>
            <button type="submit" className='btn rounded shadow-lg mt-2 bg-danger' onClick={handleSubmit}>click</button>
            </form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="w-100 my-2 p-5 py-2 bg-info shadow-md">Scraping for url:-{url}</div>
       <div>
       <div className="container">
            <div className="row">
              {data?.map((obj,index) => (
                <div key={index} className="col-lg-3 mb-3">
                  <div
                    className="shadow pt-1 bg-white border-outline-none"
                    style={{ width: "100%", height: "21rem" }}
                  >
                    <img
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "21rem",
                        objectFit: "cover",
                      }}
                      variant="top"
                      src={`${obj}`}
                    />
             
                  </div>
                </div>
              ))}
            </div>
          </div>
       </div>

    </>
  );
}

export default ScrapPage;
