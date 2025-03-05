// require('dotenv').config()
import dotenv from "dotenv" 
import mongoose from "mongoose";
import connectDb from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDb(); 








// ;(async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGO_URI}`)
//     } catch (error) {
//         console.log("error :",error);
//         throw error;
//     }
// })()