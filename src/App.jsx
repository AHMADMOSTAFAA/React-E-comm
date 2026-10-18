import React from 'react'
import { HomePage } from './pages/home/HomePage'
import {  useState,useEffect } from "react";
import axios from "axios";
import {Routes,Route} from 'react-router'
import {OrdersPage} from './pages/orders/OrdersPage'
import  CheckOutPage from './pages/checkout/CheckOutPage'
import Header from './components/header'
import './App.css'


function App() {
 const [cart, setCart] = useState([]);

  const loadCart=async ()=>{
  const response=await axios.get("/api/cart-items?expand=product")
  setCart( response.data);
 }  
useEffect(() => {
loadCart();
}, []);
  return (
    <>
    <Header cart={cart} />
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
       <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="checkout" element={<CheckOutPage cart={cart} loadCart={loadCart} />} />
      <Route path="orders" element={<OrdersPage cart={cart}  />} />
    </Routes>
    </>
  )
}

export default App
