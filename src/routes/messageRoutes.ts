import { Router } from "express";
import * as messageController from "../controllers/messageController.js"

const messageRouter = Router();

messageRouter.get("/create-message", messageController.getCreateMessage);

export default messageRouter;