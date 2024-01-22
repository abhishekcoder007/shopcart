import React ,{useState,useContext} from 'react';
import axios from "axios";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Searchbar from '../component/searchbar';
import {UserContext} from "../index.js";

const My = () => {
    const [name,setname]=useState("")
    const [image,setimage]=useState("");
    const [rangeValues, setRangeValues] = useState([500, 750, 1000]);
    const {globaldata,setglobaldata}=useContext(UserContext)
    const handleRangeChange = (values) => {
      setRangeValues(values);
    };

    const handleName=(e)=>{
           setname(e.target.value)
    }
    const handleImage=(e)=>{
        const file=e.target.files[0]
        console.log(file)
        setimage(file)
 }

 const handleSubmit=(e)=>{
    e.preventDefault();
    const formData=new FormData();
       formData.append("name",name);
       formData.append("image",image);

      const resp= axios.post("http://localhost:2024/product/add/p",formData)

      console.log(resp);

    
 }
  return (
    <div>
     
{<Searchbar/>}
      <div>
     <p>{JSON.stringify(globaldata.data)}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" onChange={handleName} /><br></br>
        <input type="file" name="image" onChange={handleImage} />
         <button type="submit" >submit</button>
      </form>

      <label>Range</label>
      <Slider
        min={500}
        max={100000}
        value={rangeValues}
        onChange={handleRangeChange}
        step={1}
        marks={{ 500: '500', 750: '750',1000: '1000', 10000: '1000' }}
        allowCross={false}
        range
      />
      <p>Selected range: {rangeValues[0]} to {rangeValues[2]}</p>
    </div>
  )
}

export default My
