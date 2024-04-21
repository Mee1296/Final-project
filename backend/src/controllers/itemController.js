import Item from "../models/itemModel.js";

export const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};


export const getItems = async (req, res) => {
  const items = await Item.find();

  res.status(200).json(items);
};

export const deleteItem = async (req, res) => {
  const id = req.params.id
  await Item.deleteOne({_id: id})
  res.status(501).send("Unimplemented");
};

export const filterItems = async (req, res) => {
  const body = req.body
  let filtered
  if(body.filtername === "ทั้งหมด"){
    filtered = await Item.find({price: {$gt: body.lowerprice, $lt: body.upperprice} })
  }
  else {
    filtered = await Item.find({ name: body.filtername, price: {$gt: body.lowerprice, $lt: body.upperprice} })
  }
  console.log(body)
  console.log(body.upperprice)
  console.log(filtered)
  res.status(200).send(filtered);
};
// router.post("/create_room", async(req, res)=>{
    
//   console.log(req.body.name)
   
//   const r = new Room({'name' : req.body.name})
      

//   await r.save() 
//   console.log("???")
//   // res.status(200).json({ message: "OK" });
//   res.send(r._id)
// })