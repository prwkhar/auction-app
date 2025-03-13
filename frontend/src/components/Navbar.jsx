import { Link, useNavigate } from 'react-router-dom'
import React from 'react'

const Navbar = () => {
  const navigate = useNavigate()
  
  const handleLogout = () => {
    // Optionally call your backend logout endpoint.
    // For simplicity, we just remove the token.
    localStorage.removeItem('accessToken')
    navigate('/')
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/host" className="mr-4">Host Auction</Link>
        </div>
        <div>
          <Link to="/login" className="mr-4">Login</Link>
          <Link to="/register" className="mr-4">Register</Link>
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
