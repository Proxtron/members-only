import type { Request, Response } from "express";
import { getAllMessages } from "../db/message.js";

export const index = async (req: Request, res: Response) => {
    const messages = await getAllMessages();
    res.render("index", {messages});
}
