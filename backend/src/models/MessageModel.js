
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
});
    
const Message = mongoose.model("Message", messageSchema);
    
export default Message