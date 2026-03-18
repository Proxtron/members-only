import { Router } from "express";
import * as messageController from "../controllers/messageController.js"
import { body, param } from "express-validator";
import validationResultMiddleware from "../middleware/validationResultMiddleware.js";
import { checkAdmin } from "../middleware/checkAuthenticationMiddleware.js";


const messageRouter = Router();

messageRouter.get("/create-message", messageController.getCreateMessage);
messageRouter.post("/create-message",
    body("title").trim().notEmpty().withMessage("Title is a required field"),
    body("message").trim().notEmpty().withMessage("Message is a required field"),
    validationResultMiddleware("create-message"),
    messageController.postCreateMessage
);

messageRouter.get("/delete-message/:message_id",
    checkAdmin,
    param("message_id").isInt().withMessage("Param message_id must be an integer"),
    messageController.getDeleteMessage
);

export default messageRouter;