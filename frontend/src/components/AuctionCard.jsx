import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
const AuctionCard = ({ auction }) => {
  const [lastBid, setLastBid] = useState(null);

  useEffect(() => {
    if (auction?.bids?.length > 0) {
      setLastBid(auction.bids[auction.bids.length - 1]);
    } else {
      setLastBid(null);
    }
  }, [auction]); // Runs whenever auction changes

  return (
    <div className="border p-4 bg-slate-500 rounded-2xl border-amber-50 shadow-black hover:shadow-lg transition flex flex-col justify-center items-center">
      <img
        src={auction.image}
        alt={auction.title}
        className="w-full h-48 object-cover rounded-2xl"
      />
      <div className="bg-amber-400/50 border-white w-full mt-2 p-2 rounded-2xl">
      <h2 className="text font-semibold mt-2">Title: {auction.title}</h2>
      <p >
        {auction.status === "completed" ? "Sold at-" : "Current Bid-"} $
        {auction.currentBid}
      </p>
      {lastBid && lastBid.user && lastBid.user.username && (
        <p className="text text-gray-500">
          Last bid by: {lastBid.user.username}
        </p>
      )}
      {auction.status === "completed" &&
        auction.winner &&
        auction.winner.username && (
          <p className="text-sm text-green-600">
            Winner: {auction.winner.username}
          </p>
        )}
      <p className="mt-1 text-sm italic">Status: {auction.status}</p>
      <Link
        to={`/auction/${auction._id}`}
        className="text-green-800 underline mt-2 block"
      >
        View Details
      </Link>
      </div>
    </div>
  );
};

export default AuctionCard;
