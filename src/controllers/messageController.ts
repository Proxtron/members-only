import type { NextFunction, Request, Response } from "express";
import { createMessage } from "../db/message.js";

export const getCreateMessage = async (req: Request, res: Response) => {
    res.render("create-message");
}

export const postCreateMessage = async (req: Request<{}, {}, {
    title: string,
    message: string
}>, res: Response, next: NextFunction) => {
    const { title, message } = req.body;
    const user_id = req.user?.id;
    try {
        if(!user_id) {
            return res.status(401).send("Unauthorized");
        }

        const newMessageId = await createMessage(user_id, title, message);
        return res.redirect("/");
    } catch(err) {
        next(err);
    }
}