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

  return res
    .status(201)
    .json(new apiResponse(201, auction, "Auction hosted successfully"));
});

const getAuctions = asyncHandler(async (req, res) => {
  const auctions = await Auction.find().populate("auctioneer", "username fullName");
  return res.status(200).json(new apiResponse(200, auctions, "Auctions fetched successfully"));
});

const getAuction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const auction = await Auction.findById(id).populate("auctioneer", "username fullName");
  if (!auction) {
    throw new apiError(404, "Auction not found");
  }
  return res.status(200).json(new apiResponse(200, auction, "Auction fetched successfully"));
});

const placeBid = asyncHandler(async (req, res) => {
  const { auctionId, bidAmount } = req.body;
  const userId = req.user._id;

  const auction = await Auction.findById(auctionId);
  if (!auction) {
    throw new apiError(404, "Auction not found");
  }

  if (new Date() > new Date(auction.endTime)) {
    throw new apiError(400, "Auction has ended");
  }

  if (bidAmount <= auction.currentBid) {
    throw new apiError(400, "Bid must be higher than the current bid");
  }

  // Add bid to the auction's bid history and update the current bid
  auction.bids.push({
    user: userId,
    amount: bidAmount,
    timestamp: new Date(),
  });
  auction.currentBid = bidAmount;

  // Set status to ongoing if within auction time window
  const now = new Date();
  if (now >= new Date(auction.startTime) && now <= new Date(auction.endTime)) {
    auction.status = "ongoing";
  }

  await auction.save();

  // Emit real-time update to all clients in the auction room using Socket.IO
  const io = req.app.locals.io;
  if (io) {
    io.to(auctionId.toString()).emit("bidUpdate", {
      auctionId,
      currentBid: auction.currentBid,
      highestBidder: userId,
    });
  }

  return res
    .status(200)
    .json(new apiResponse(200, auction, "Bid placed successfully"));
});

export { hostAuction, getAuctions, getAuction, placeBid };
