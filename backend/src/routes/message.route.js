import express from "express";
import { protectRoute } from "../middleware/protectRoute.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar); // get every user on contact list

router.get("/:id", protectRoute, getMessages); // message between two user

router.post("/send/:id", protectRoute, sendMessage); // send message to other user

export default router;
