// require('dotenv').config()
import dotenv from "dotenv" 
import mongoose from "mongoose";
import connectDb from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDb().then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`process is running at ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!",err);
})








// ;(async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGO_URI}`)
//     } catch (error) {
//         console.log("error :",error);
//         throw error;
//     }
// })()