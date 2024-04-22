import express from "express";
import User from "../models/userModel.js";
import { isAuthenticated } from "../meddilewares/isAuth.js";

const router = express.Router();

router.get("/alluser", isAuthenticated, async (req, res) => {
  try {
    const _id = req._id;
    const users = await User.find({ _id: { $ne: _id } }).select("-password");

    if (!users) {
      res.status(404).send({ success: false, message: "Users not found" });
    }
    res.status(200).send({ success: true, message: "Users found", users });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

export default router;
