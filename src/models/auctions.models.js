import mongoose, { Schema } from "mongoose";

const auctionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String, // Store the image URL (Cloudinary, S3, etc.)
      required: true
    },
    startingBid: {
      type: Number,
      required: true,
      min: 0
    },
    currentBid: {
      type: Number,
      default: 0 // Will be updated as users place bids
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    auctioneer: {
      type: Schema.Types.ObjectId,
      ref: "User", // Links to the user who is hosting this auction
      required: true
    },
    bids: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User" // User who placed the bid
        },
        amount: {
          type: Number,
          required: true
        },
        timestamp: {
          type: Date,
          default: Date.now
        }
      }
    ],
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming"
    },
    winner: {
      type: Schema.Types.ObjectId,
      ref: "User", // The winning bidder, set when the auction ends
      default: null
    }
  },
  { timestamps: true }
);

export const Auction = mongoose.model("Auction", auctionSchema);
