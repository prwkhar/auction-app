import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb = async () => {
    try{
       const connecitoninstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
       console.log(`Mongodb connected !! DBHost : ${connecitoninstance.connection.host}`)
    }
    catch(error){
        console.log("MONGO DB connection error ",error)
    }
} 
export default connectDb;