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
useEffect(() => {
   axios.get("/api/cart-items?expand=product").then((response) => {
        console.log("Cart items:", response.data);
        setCart(response.data);
      })
}, []);
  return (
    <>
    <Header cart={cart} />
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
       <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckOutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
    </Routes>
    </>
  )
}

export default App
