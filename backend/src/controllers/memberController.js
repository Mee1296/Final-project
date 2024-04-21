// TODO4: you may need to import something here
import Member from "../models/memberModel.js";
import Item from "../models/itemModel.js";
export const createMember = async (req, res) => {

  try {
    const newMember = new Member(req.body);
    await newMember.save();

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
  // TODO4: implement this function
  // res.status(501).send("Unimplemented");
};

export const getMembers = async (req, res) => {
  const members = await Member.find();

  res.status(200).json(members);
  // TODO4: implement this function
  // res.status(501).send("Unimplemented");
};

export const deleteMember = async (req, res) => {
  // TODO4: implement this function
  const id = req.params.id
  const name = await Member.find({_id: id})
  console.log(name[0].name)
  await Item.deleteMany({name: name[0].name})
  await Member.deleteOne({_id: id})
  res.status(501).send("Unimplemented");
  // res.status(501).send("Unimplemented");
};