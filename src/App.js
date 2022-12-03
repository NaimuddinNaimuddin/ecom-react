import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/login"
import Home from "./components/Home"
import AddProduct from './components/AddProduct';
import GetProducts from './components/GetProducts';
import GetProduct from './components/GetProduct';
import Signup from './components/Signup';
import UserCart from './components/UserCart';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/add/product' element={<AddProduct />} />
        <Route path='/get/products' element={<GetProducts />} />
        <Route path='/get/product/:id' element={<GetProduct />} />
        <Route path='/get/cart' element={<UserCart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
