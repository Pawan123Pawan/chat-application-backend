import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
export const sendMessageController = async (req, res) => {
  try {
    const senderId = req._id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
      await gotConversation.save();
    }

    await Promise.all([gotConversation.save(), newMessage.save()]);

    // SOCKET IO
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).send({
      success: true,
      message: "Message sant successfully",
      newMessage,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

export const getMessageController = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    return res
      .status(200)
      .send({ success: true, message: conversation?.messages });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
