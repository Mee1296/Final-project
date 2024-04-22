import express from "express";
import Room from "../models/RoomModel.js";


const router = express.Router();

router.post("/create_room", async(req, res)=>{

        
    console.log(req.body)
    
    const r = new Room({'name' : req.body.name})
        

    await r.save() 
    console.log("???")
    // res.status(200).json({ message: "OK" });
    res.status(200).json({ message: "OK" });
}) 

router.post("/join_room", async(req, res)=>{
    console.log(req.body) 
    const room = await Room.findOne({name:req.body.id})
    console.log(room)
    var member = room.member
    console.log(member)
    member.push({name : req.body.name , pos : req.body.pos})
    await Room.replaceOne({name: req.body.id} , { name : room.name, chat : room.chat, member: member})

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
router.get("/:id", async(req, res)=>{
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Access-Control-Allow-Origin' , '*') 

    const IntervalID = setInterval(async ()=>{
        const r = await Room.find({name : req.params.id})
        res.send({'char' : r.chat,
                    'member' : r.member})
    },1000)

    const r = await Room.find({name : req.params.id})
    console.log(r)
    res.send({'chat' : r.chat, 'member' : r.member})

    res.on('close',()=>{ 
        console.log("Log out") 
    })
})

export default router