import { response } from "express";
import Conversation from "../model/conversationModel.js";
import Message from "../model/message.js";
import { getReciverSocketId, io } from "../socket/socket.js";

export const sendmessage = async(req, res) => {
    try{
        const {message} = req.body;
        const  reciverId = req.params.id;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId,reciverId]}
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId,reciverId]
            })
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            message
        })
        if (newMessage){
            conversation.messages.push(newMessage._id)
        }
     

        await Promise.all([conversation.save(),newMessage.save()])

        //socket function

        const reciverSocketId = getReciverSocketId(reciverId);
        if (reciverSocketId && io) {  // Ensure io is defined and socket ID is valid
            io.to(reciverSocketId).emit("newMessage", newMessage);
        }


        res.status(201).json(newMessage)



    }
    catch(err){
        console.log("Error in send message controller",err.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const getMessage = async(req, res) => {
  try{

    const {id:userToChatId} = req.params;
    const senderId = req.user._id;


    const conversation = await Conversation.findOne({
        participants: {$all: [senderId,userToChatId]}
    }).populate("messages");

    if(!conversation){
        return res.status(200).json([])
    }



   res.status(200).json(conversation.messages);




  }
  catch(err){
      console.log("Error in get message controller",err.message);
      res.status(500).json({error: "Internal server error"});
  }


}