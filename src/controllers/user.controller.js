import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import cloudinary_uploader from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
import { upload } from "../middlewares/multer.midlewares.js";
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
      throw new apiError(500, "something went wrong while generating tokens");
    }
  };

  const registerUser = asyncHandler(async (req, res) => {
    //get user data from frontend ✔️
    //validaton checks ✔️
    //check if user already exists ✔️
    //check for image and avatar ✔️
    //upload image to cloudinary,avatar✔️
    //create user object - create entry in db✔️
    //remove password and refresh token field from res ✔️
    //return res ✔️
    const { fullName, email, username, password } = req.body;
    console.log(req.body);
  
    //validation check
    if (fullName == "") throw new apiError(400, "full name required");
    //add more validation check later
  
    //check if user already exist
    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existedUser) {
      throw new apiError(409, "user with email or username already exist");
    }
  
    //access of files given by multer
    // const avatarlocalpath = req.files?.avatar[0]?.path;
    // console.log(req.files);
  
    // if (!avatarlocalpath) {
    //   throw new apiError(400, "Avatar is required");
    // }
  
    // //upload them to cloudinary
    // const avatar = await cloudinary_uploader(avatarlocalpath);
    // const coverimage = await cloudinary_uploader(coverimagelocalpath);
  
    // if (!avatar) throw new apiError(400, "Avatar is required");
  
    const userref = await User.create({
      fullName,
    //   avatar: avatar.url,
    //   coverImage: coverimage?.url || "",
      email,
      password,
      username: username,
    });
  
    const createduser = await User.findById(userref._id).select(
      "-password -refreshToken"
    );
  
    if (!createduser) {
      throw new apiError(500, "something went wrong while registering the user");
    }
  
    return res
      .status(201)
      .json(new apiResponse(200, createduser, "user registered successfully"));
  });

  const loginUser = asyncHandler(async(req,res)=>{
    const {username,password}    = req.body;
    if(username==""||password=="")
        res.json(new apiResponse(400,"username or password not given"));
    //check if user exist
    const user = await User.findOne({username:username});
    if (!user) {
        throw new apiError(400, "user not exist");
      }
    
      const ispassvalid = await user.isPasswordCorrect(password);
    
      if (!ispassvalid) {
        throw new apiError(401, "Invalid user credentials");
      }
    
      const { accessToken, refreshToken } = await generateAccessandRefreshTokens(
        user._id
      );
    
      //sending to cookies
      const loggedinuser = await User.findById(User._id).select(
        "-password -refreshToken"
      );
    
      //because of this its can only be modified from server
      const options = {
        httpOnly: true,
        secure: true,
      };
    
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
          new apiResponse(
            200,
            {
              user: loggedinuser,
              accessToken,
              refreshToken,
            },
            "user logged in successfully"
          )
        );
  });
export {registerUser,loginUser};