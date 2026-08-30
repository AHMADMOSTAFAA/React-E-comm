import React from 'react'
import { HomePage } from './pages/HomePage'
import {Routes,Route} from 'react-router'
import  CheckOutPage from './pages/CheckOutPage'
import './App.css'

function App() {


  return (
    <>
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
       <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckOutPage />} />
    </Routes>
    </>
  )
}

export default App
