import { Link } from 'react-router-dom'
import React from 'react'

const AuctionCard = ({ auction }) => {
  const lastBid = auction.bids && auction.bids.length > 0
    ? auction.bids[auction.bids.length - 1]
    : null

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <img src={auction.image} alt={auction.title} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-semibold mt-2">{auction.title}</h2>
      <p className="text-gray-600">Current Bid: ${auction.currentBid}</p>
      {lastBid && lastBid.user && lastBid.user.username && (
        <p className="text-sm text-gray-500">Last bid by: {lastBid.user.username}</p>
      )}
      {auction.status === 'completed' && auction.winner && auction.winner.username && (
        <p className="text-sm text-green-600">Winner: {auction.winner.username}</p>
      )}
      <p className="mt-1 text-sm italic">Status: {auction.status}</p>
      <Link to={`/auction/${auction._id}`} className="text-blue-500 underline mt-2 block">View Details</Link>
    </div>
  )
}

export default AuctionCard
