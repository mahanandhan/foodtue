import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import ItemPage from './pages/ItemPage'
import SignupPage from './pages/SignupPage'
import OrdersPage from './pages/OrderPage'
import CartPage from './pages/CartPage'
import HotelLogin from './hotel/HotelLogin'
import HotelSignup from './hotel/HotelSignup'
import HotelDashboard from './hotel/HotelDashboard'
const App = () => {
  return (
    <div>
      {/* <h1>Hello World</h1> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path='/items/:id' element={<ItemPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/orders' element={<OrdersPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/hotellogin' element={<HotelLogin />} />
        <Route path='/hotelsignup' element={<HotelSignup />} />
        <Route path='/hoteldashboard' element={<HotelDashboard />} />
      </Routes>
    </div>
  )
}

export default App
