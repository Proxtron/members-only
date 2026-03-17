import type { Request, Response } from "express";
import pool from "../db/pool.js";

export const getCreateMessage = async (req: Request, res: Response) => {
    res.render("create-message");
}
