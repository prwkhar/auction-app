import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import React from 'react'

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/users/logout', null, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      })
    } catch (error) {
      console.error("Logout error", error)
    }
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="bg-gray-800 text-white p-4 w-700px">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="font-bold text-xl">Auction App</Link>
          <Link to="/" className="hover:underline">Dashboard</Link>
          <Link to="/host" className="hover:underline">Host Auction</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
