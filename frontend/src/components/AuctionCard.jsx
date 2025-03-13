import { Link } from 'react-router-dom'
import React from 'react'

const AuctionCard = ({ auction }) => {
  return (
    <div className="border p-4 rounded shadow">
      <img src={auction.image} alt={auction.title} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-semibold mt-2">{auction.title}</h2>
      <p className="text-gray-600">Current Bid: ${auction.currentBid}</p>
      <Link to={`/auction/${auction._id}`} className="text-blue-500 underline mt-2 block">
        View Details
      </Link>
    </div>
  )
}

export default AuctionCard
