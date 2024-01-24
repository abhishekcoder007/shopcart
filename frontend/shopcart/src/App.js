import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/productPage";
import Nopage from "./pages/noPage";
import Edit from "./pages/edit";
import My from "./pages/my";
import Home from "./pages/home";
import Cart from "./pages/cart";
import ScrapPage from "./pages/scrapPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<Home/>}/>
          <Route path="/product"  element={<ProductPage/>}/>
          <Route path="/edit"  element={<Edit/>}/>
          <Route path="/my"  element={<My/>}/>
          <Route path="/cart"  element={<Cart/>}/>
          <Route path="/scrap"  element={<ScrapPage/>}/>
          <Route path="*"  element={<Nopage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
