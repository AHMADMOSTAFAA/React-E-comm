import React from 'react'
import { HomePage } from './pages/HomePage'
import {Routes,Route} from 'react-router'
import OrdersPage from './pages/OrdersPage'
import  CheckOutPage from './pages/CheckOutPage'
import './App.css'
import Header from './components/header'

function App() {


  return (
    <>
    <Header/>
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
       <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckOutPage />} />
      <Route path="orders" element={<OrdersPage />} />
    </Routes>
    </>
  )
}

export default App
