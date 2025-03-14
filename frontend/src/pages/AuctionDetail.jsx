import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'

const AuctionDetail = () => {
  const { id } = useParams()
  const [auction, setAuction] = useState(null)
  const [bidAmount, setBidAmount] = useState(0)
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/auctions/${id}`)
      .then(res => setAuction(res.data.data))
      .catch(err => console.error(err))

    const newSocket = io("http://localhost:8000", { transports: ['websocket'] })
    newSocket.emit("joinAuction", id)
    setSocket(newSocket)

    newSocket.on("bidUpdate", (data) => {
      if (data.auctionId === id) {
        setAuction(prev => ({ ...prev, currentBid: data.currentBid }))
      }
    })

    return () => newSocket.disconnect()
  }, [id])

  const handlePlaceBid = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      await axios.post('http://localhost:8000/api/v1/auctions/bid', 
        { auctionId: id, bidAmount },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      alert('Bid placed successfully')
    } catch (err) {
      console.error(err)
      alert('Failed to place bid')
    }
  }

  if (!auction) return <div className="container mx-auto p-4">Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{auction.title}</h1>
      <img src={auction.image} alt={auction.title} className="w-full h-64 object-cover mt-4" />
      <p className="mt-4">{auction.description}</p>
      <p className="mt-2">Starting Bid: ${auction.startingBid}</p>
      <p className="mt-2">Current Bid: ${auction.currentBid}</p>
      {auction.bids && auction.bids.length > 0 && (
        <p className="mt-2 text-sm text-gray-600">Last bid by: {auction.bids[auction.bids.length - 1].user.username}</p>
      )}
      {auction.status === 'completed' && auction.winner && (
        <p className="mt-2 text-green-600">Winner: {auction.winner.username}</p>
      )}
      <div className="mt-4">
        <input 
          type="number" 
          placeholder="Your bid" 
          value={bidAmount} 
          onChange={(e) => setBidAmount(Number(e.target.value))} 
          className="border p-2" 
        />
        <button onClick={handlePlaceBid} className="bg-green-500 text-white p-2 ml-2">Place Bid</button>
      </div>
    </div>
  )
}

export default AuctionDetail
