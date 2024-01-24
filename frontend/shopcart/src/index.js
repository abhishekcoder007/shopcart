import React ,{useState,createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export const UserContext=createContext();

const Myglobalstate=({children})=>{
  const [globaldata,setglobaldata]=useState({data:[]});
  const [cartdata,setcartdata]=useState([]);
  const [searchdata,setsearchdata]=useState("");
 

  return(
    <>
   <UserContext.Provider  value={{globaldata,setglobaldata,cartdata,setcartdata,searchdata,setsearchdata}}>
       {children}
   </UserContext.Provider>

    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Myglobalstate>
    <App />
    </Myglobalstate>
  </React.StrictMode>
);
reportWebVitals();
