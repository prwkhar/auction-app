import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AuctionCard from '../components/AuctionCard'

const Home = () => {
  const [auctions, setAuctions] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/auctions')
      .then(res => {
        setAuctions(res.data.data)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Active Auctions</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {auctions.map(auction => (
          <AuctionCard key={auction._id} auction={auction} />
        ))}
      </div>
    </div>
  )
}

export default Home
