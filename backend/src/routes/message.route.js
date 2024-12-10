import express from "express"
import { protectRoute } from "../middleware/protectRoute.middleware.js"
import { getMessages, getUsersForSidebar } from "../controllers/message.controller.js"

const router = express.Router()

router.get("/users", protectRoute, getUsersForSidebar) // get every user on contact list

router.get("/:id", protectRoute, getMessages) // message between two user


export default router