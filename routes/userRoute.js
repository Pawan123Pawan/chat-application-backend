import express from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../controllers/userControllers.js";
import { isAuthenticated } from "../meddilewares/isAuth.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", isAuthenticated, logoutController);

export default router;
