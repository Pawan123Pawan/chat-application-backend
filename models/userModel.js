import { mongoose } from "mongoose";

const useModel = new mongoose.Schema({
  username: {
    type: "string",
    unique: true,
    required: true,
  },
  fullname: {
    type: "string",
    required: true,
  },
  email:{
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  profileimg: { type: "string", required: true, default: "" },
  gender: {
    type: "string",
    enum: ["male", "female"],
    required: true,
  },
},{timestamp:true});

const  User = mongoose.model("user",useModel);
export default User;