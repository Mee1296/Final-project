import { json, text } from "express";
import mongoose from "mongoose";
import { type } from "os";

const roomSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
    },
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