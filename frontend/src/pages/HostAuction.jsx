import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const HostAuction = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [startingBid, setStartingBid] = useState(0)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const navigate = useNavigate()

  const handleHostAuction = async (e) => {
    e.preventDefault()
    try {
      const accessToken = localStorage.getItem('accessToken')
      const res = await axios.post('http://localhost:8000/api/v1/auctions/host', 
        { title, description, image, startingBid, startTime, endTime },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      alert('Auction hosted successfully!')
      navigate(`/auction/${res.data.data._id}`)
    } catch (err) {
      console.error(err)
      alert('Failed to host auction')
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Host Auction</h1>
      <form onSubmit={handleHostAuction} className="flex flex-col">
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="border p-2 mb-2" 
        />
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="border p-2 mb-2" 
        />
        <input 
          type="text" 
          placeholder="Image URL" 
          value={image} 
          onChange={(e) => setImage(e.target.value)} 
          className="border p-2 mb-2" 
        />
        <input 
          type="number" 
          placeholder="Starting Bid" 
          value={startingBid} 
          onChange={(e) => setStartingBid(Number(e.target.value))} 
          className="border p-2 mb-2" 
        />
        <input 
          type="datetime-local" 
          placeholder="Start Time" 
          value={startTime} 
          onChange={(e) => setStartTime(e.target.value)} 
          className="border p-2 mb-2" 
        />
        <input 
          type="datetime-local" 
          placeholder="End Time" 
          value={endTime} 
          onChange={(e) => setEndTime(e.target.value)} 
          className="border p-2 mb-2" 
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Host Auction</button>
      </form>
    </div>
  )
}

export default HostAuction
