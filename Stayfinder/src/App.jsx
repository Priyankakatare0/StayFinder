import React from 'react'
import { useState } from 'react'
// import Hotels from './components/Listings'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './Page/About'
// import AddRetreat from './Page/AddRetreat'
import Login from './Page/Login'
import HotelDetails from './components/ListingDetails'
import SignUp from './Page/Signup'
import AddListing from './Page/AddListing'
// import './App.css'
import Home from './components/Home'
import Listings from './components/Listings'
import ListingDetails from './components/ListingDetails'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/' element={<Listings />} />
          <Route path='/about' element={<About />} />
          <Route path='/add_listing' element={<AddListing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/listing/:id' element={<ListingDetails />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
