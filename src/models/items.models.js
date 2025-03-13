import mongoose from "mongoose";
import { Schema } from "mongoose";

const itemsSchema = new Schema(
    {
        itemname:{
            type: String,
            required: true,
        },
        image:{
            type: String,//cloudinary url
        },
        sold:{
            type: Boolean,
        },
        solto:{
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        soldat:{
            type: Number,
        }
    }
)