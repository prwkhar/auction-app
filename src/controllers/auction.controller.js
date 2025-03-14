import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { Auction } from "../models/auctions.models.js";
import { apiResponse } from "../utils/apiResponse.js";

const hostAuction = asyncHandler(async (req, res) => {
  const { title, description, image, startingBid, startTime, endTime } = req.body;
  const auctioneerId = req.user._id;
  if (!title || !description || !image || !startingBid || !startTime || !endTime) {
    throw new apiError(400, "All fields are required to host an auction");
  }
  const auction = await Auction.create({
    title,
    description,
    image,
    startingBid,
    currentBid: startingBid,
    startTime,
    endTime,
    auctioneer: auctioneerId,
    status: "upcoming",
  });
  return res.status(201).json(new apiResponse(201, auction, "Auction hosted successfully"));
});

const getAuctions = asyncHandler(async (req, res) => {
  let auctions = await Auction.find()
    .populate("auctioneer", "username fullName")
    .populate("bids.user", "username")
    .populate("winner", "username");
  
  const now = new Date();
  auctions = auctions.map(auction => {
    const start = new Date(auction.startTime);
    const end = new Date(auction.endTime);
    if (now < start) {
      auction.status = "upcoming";
    } else if (now >= start && now <= end) {
      auction.status = "ongoing";
    } else if (now > end) {
      auction.status = "completed";
      if (auction.bids && auction.bids.length > 0 && !auction.winner) {
        auction.winner = auction.bids[auction.bids.length - 1].user;
      }
    }
    return auction;
  });

  return res.status(200).json(new apiResponse(200, auctions, "Auctions fetched successfully"));
});

const getAuction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let auction = await Auction.findById(id)
    .populate("auctioneer", "username fullName")
    .populate("bids.user", "username")
    .populate("winner", "username");
  if (!auction) {
    throw new apiError(404, "Auction not found");
  }
  const now = new Date();
  const start = new Date(auction.startTime);
  const end = new Date(auction.endTime);
  if (now < start) {
    auction.status = "upcoming";
  } else if (now >= start && now <= end) {
    auction.status = "ongoing";
  } else if (now > end) {
    auction.status = "completed";
    if (auction.bids && auction.bids.length > 0 && !auction.winner) {
      auction.winner = auction.bids[auction.bids.length - 1].user;
    }
  }
  return res.status(200).json(new apiResponse(200, auction, "Auction fetched successfully"));
});

const placeBid = asyncHandler(async (req, res) => {
  const { auctionId, bidAmount } = req.body;
  const userId = req.user._id;
  const auction = await Auction.findById(auctionId);
  if (!auction) throw new apiError(404, "Auction not found");

  const now = new Date();
  const start = new Date(auction.startTime);
  const end = new Date(auction.endTime);
  
  if (now < start) {
    throw new apiError(400, "Auction has not started yet");
  }
  if (now > end) {
    throw new apiError(400, "Auction has ended");
  }
  if (bidAmount <= auction.currentBid) {
    throw new apiError(400, "Bid must be higher than the current bid");
  }
  
  auction.bids.push({
    user: userId,
    amount: bidAmount,
    timestamp: now,
  });
  auction.currentBid = bidAmount;
  auction.status = "ongoing";
  await auction.save();

  const io = req.app.locals.io;
  if (io) {
    io.to(auctionId.toString()).emit("bidUpdate", {
      auctionId,
      currentBid: auction.currentBid,
      highestBidder: userId,
    });
  }
  
  return res.status(200).json(new apiResponse(200, auction, "Bid placed successfully"));
});

export { hostAuction, getAuctions, getAuction, placeBid };
