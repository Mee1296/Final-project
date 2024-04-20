import express from "express";
import Room from "../Model/RoomModel";


const router = express.Router();

router.post("/create_room", async(req, res)=>{

    const r = new Room()
    await r.save()

    res.send(r._id)
})

router.get("/join_room", async(req, res)=>{

    const room = Room.find(req.body.id)
    const member = {name : req.body.name , pos : 0}
    await Room.replaceOne({_id: req.body.id} , {chat : room.chat, member: room.member.push(member)})

    res.status(200).json({ message: "OK" });
})
router.get("/chat", async(req, res)=>{

    const room = Room.find(req.body.id)
    await room.member.replaceOne({name : req.body.name} , {pos : req.body.pos})
    await Room.replaceOne({_id: req.body.id} , {chat : room.chat, member: room.member})

    res.status(200).json({ message: "OK" });
})
router.get("/click", async(req, res)=>{

    const room = Room.find(req.body.id)
    const chat = {name : req.body.name , chat : req.body.chat}
    await Room.replaceOne({_id: req.body.id} , {chat : room.chat.push(chat), member: room.member})

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