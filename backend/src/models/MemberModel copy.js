
import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    pos: {
        type: Int16Array,
        required: true,
    }
    });
    
const Member = mongoose.model("Model", memberSchema);
    
export default Member