import { mongoose } from "mongoose";

const messageModel = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    message: { type: "string", required: true },
  },
  {
    timestamp: true,
  }
);

const Message = mongoose.model("message", messageModel);
export default Message;
