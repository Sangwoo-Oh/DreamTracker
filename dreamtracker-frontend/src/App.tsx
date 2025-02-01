import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Login from './Login'
import SignUp from './SignUp'

const Home = () => {
  return (
    <h1 className='text-7xl font-bold'>This is Home!</h1>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
