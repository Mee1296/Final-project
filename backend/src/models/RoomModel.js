import { json, text } from "express";
import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    member: {
        type: Array,
        required: true,
    },
    chat: {
        type: Array,
        required: true,
    }
    });
    
const Room = mongoose.model("Room", roomSchema);
    
export default Room;