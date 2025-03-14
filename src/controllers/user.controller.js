import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import cloudinary_uploader from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessandRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(500, "Something went wrong while generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  if (!fullName || !email || !username || !password) {
    throw new apiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new apiError(409, "User with email or username already exists");
  }
  const userRef = await User.create({
    fullName,
    email,
    password,
    username,
  });
  const createdUser = await User.findById(userRef._id).select("-password -refreshToken");
  if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering the user");
  }
  return res.status(201).json(new apiResponse(201, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) throw new apiError(400, "Username or password not provided");
  const user = await User.findOne({ username });
  if (!user) throw new apiError(400, "User does not exist");
  const isPassValid = await user.isPasswordCorrect(password);
  if (!isPassValid) throw new apiError(401, "Invalid user credentials");
  const { accessToken, refreshToken } = await generateAccessandRefreshTokens(user._id);
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
  const options = { httpOnly: true, secure: true };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new apiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) throw new apiError(400, "No refresh token provided");
  const user = await User.findOne({ refreshToken: token });
  if (!user) throw new apiError(400, "Invalid token");
  user.refreshToken = null;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new apiResponse(200, {}, "User logged out successfully"));
});

export { registerUser, loginUser, logoutUser };
