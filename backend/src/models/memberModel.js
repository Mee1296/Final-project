import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})

const Member = mongoose.model("Member", memberSchema);

export default Member;
// TODO4: create the member model
// HINT: you can see and understand how to create model in ./itemModel.js