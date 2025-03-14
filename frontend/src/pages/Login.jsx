import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8000/api/v1/users/login', 
        { username, password },
        { withCredentials: true }
      )
      const { accessToken, user } = res.data.data
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/')
    } catch (err) {
      console.error(err)
      alert('Login failed')
    }
  }

  return (
    <div className="container bg-green-600/50 rounded-2xl mt-10 mx-auto p-4 max-w-md">
      <h1 className="text-2xl text-white font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col rounded-2xl">
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
        <button type="submit" className="bg-green-500 rounded-2xl mt-5 text-white p-2">Login</button>
      </form>
      </div>
  )
}

export default Login
