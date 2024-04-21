import express from "express";
import Room from "../models/RoomModel.js";


const router = express.Router();

router.post("/create_room", async(req, res)=>{

        
    console.log(req.body.name)
    
    const r = new Room({'name' : req.body.name})
        

    await r.save() 
    console.log("???")
    // res.status(200).json({ message: "OK" });
    res.send(r._id)
})

router.post("/join_room", async(req, res)=>{
    console.log(req.body.id)
    const room = await Room.findOne({_id:req.body.id})

    var member = room.member
    member.push({name : req.body.name , pos : 0})
    await Room.replaceOne({_id: req.body.id} , {chat : room.chat, member: member})

    res.status(200).json({ message: "OK" });
})
router.post("/click", async(req, res)=>{

    const room = await Room.findOne({_id:req.body.id})
    const member = room.member
    console.log(member)
    for(var i = 0 ; i < member.length ; i++){
        console.log("KK")
        if(member[i].name === req.body.name){
            console.log("OKKK")
            member[i].pos = req.body.pos
            break
        }
    }
    await Room.replaceOne({_id: req.body.id} , {chat : room.chat, member: member})

    res.status(200).json({ message: "OK" });
})
router.post("/chat", async(req, res)=>{

    const room = await Room.findOne({_id:req.body.id})
    var chat = room.chat
    console.log(chat)
    chat.push({name : req.body.name , chat : req.body.chat})
    await Room.replaceOne({_id: req.body.id} , {chat : chat, member: room.member})

    res.status(200).json({ message: "OK" });

})
router.post("/leave_room", async(req, res)=>{

    const room = await Room.findOne({_id:req.body.id})
    const member = room.member
    console.log(member)
    const curr_member = []
    for(var i = 0 ; i < member.length ; i++){
        
        if(member[i].name !== req.body.name){
            curr_member.push(member[i])
        }
    }
    await Room.replaceOne({_id: req.body.id} , {chat : room.chat, member: curr_member})

    res.status(200).json({ message: "OK" });

})
router.post("/:id", async(req, res)=>{
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Access-Control-Allow-Origin' , '*')

    const Interval = setInterval( async()=>{

        const r = await Room.find(req.params.id)
        res.write(`chat : ${r.chat, r.member}`)

    }, 1000)
    res.on('close',()=>{
        console.log("Log out")
    })
})

export default router