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

  return(
    <>
   <UserContext.Provider  value={{globaldata,setglobaldata,cartdata,setcartdata}}>
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();