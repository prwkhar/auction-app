import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/v1/users/register', 
        { fullName, email, username, password }
      )
      alert('Registration successful. Please login.')
      navigate('/login')
    } catch (err) {
      console.error(err)
      alert('Registration failed')
    }
  }

  return (
    <div className="container bg-green-600/50 rounded-2xl mt-10 mx-auto p-4 max-w-md">
      <h1 className="text-2xl text-white font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="flex flex-col rounded-2xl">
        <input 
          type="text" 
          placeholder="Full Name" 
          value={fullName} 
          onChange={(e) => setFullName(e.target.value)} 
          className="border p-2 mb-2 rounded-2xl text-white" 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="border p-2 mb-2 rounded-2xl text-white" 
        />
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className="border p-2 mb-2 rounded-2xl text-white" 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="border p-2 mb-2 rounded-2xl text-white" 
        />
        <button type="submit" className="bg-green-500 hover:from-lime-700 text-white p-2 rounded-2xl mt-3">Register</button>
      </form>
    </div>
  )
}

export default Register
