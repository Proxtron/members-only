import { Router } from "express";
import * as messageController from "../controllers/messageController.js"
import { body } from "express-validator";
import validationResultMiddleware from "../middleware/validationResultMiddleware.js";


const messageRouter = Router();

messageRouter.get("/create-message", messageController.getCreateMessage);
messageRouter.post("/create-message",
    body("title").trim().notEmpty().withMessage("Title is a required field"),
    body("message").trim().notEmpty().withMessage("Message is a required field"),
    validationResultMiddleware("create-message"),
    messageController.postCreateMessage
);

export default messageRouter;