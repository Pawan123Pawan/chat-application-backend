import { comparePassword, hashPassword } from "../helpers/hashPassword.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { username, fullname, password, cpassword, gender, email } = req.body;

    if (!(username && username.length > 6)) {
      res.status(400).send({
        success: false,
        message: "Username must be at least six characters long.",
      });
      return;
    }
    if (!fullname) {
      res
        .status(400)
        .send({ success: false, message: "Please enter a fullname." });
      return;
    }
    if (!email) {
      res
        .status(400)
        .send({ success: false, message: "Please enter a email." });
      return;
    }
    if (!(password && password.length > 6)) {
      res.status(400).send({
        success: false,
        message: "Password must be at least six characters long.",
      });
      return;
    }
    if (cpassword !== password) {
      res
        .status(400)
        .send({ success: false, message: "Passwords do not match." });
      return;
    }
    if (!gender) {
      res
        .status(400)
        .send({ success: false, message: "Please enter a gender." });
      return;
    }

    const user = await User.findOne({ username });

    if (user) {
      res.status(200).send({ success: false, message: "User already exists." });
      return;
    }

    const maleImg = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleImg = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const passwordHash = await hashPassword(password);

    await new User({
      username,
      fullname,
      password: passwordHash,
      gender,
      profileimg: gender === "male" ? maleImg : femaleImg,
      email,
    }).save();

    res
      .status(201)
      .send({ success: true, message: "User created successfully." });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
      message: "User creation failed.",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && username.length > 6)) {
      res.status(400).send({
        success: false,
        message: "Username must be at least six characters long.",
      });
      return;
    }
    if (!(password && password.length > 6)) {
      res.status(400).send({
        success: false,
        message: "Password must be at least six characters long.",
      });
      return;
    }

    const user = await User.findOne({ username });

    if (!user) {
      res
        .status(400)
        .send({ success: false, message: "Login failed, please try again." });
      return;
    }

    const passwordCompare = await comparePassword(password, user.password);

    if (!passwordCompare) {
      res
        .status(200)
        .send({ success: false, message: "Passwords do not match." });
      return;
    }

    const token = await jwt.sign({ _id: user._id }, "djkkksdopowed");

    const expiresInDays = 1;
    const expirationDate = new Date(
      Date.now() + expiresInDays * 24 * 60 * 60 * 1000
    );

    res
      .status(200)
      .cookie("token", token, { expires: expirationDate, httpOnly: true })
      .send({ success: true, message: "Login successfully.", user });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, error: error.message, message: "Login failed." });
  }
};

//logout user
export const logoutController = (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", { expires: 0 })
      .send({ success: true, message: "User logout successfully" });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
      message: "Logout failed.",
    });
  }
};
