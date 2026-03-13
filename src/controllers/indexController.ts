import type { Request, Response } from "express";
import pool from "../db/pool.js";

export const index = async (req: Request, res: Response) => {
    res.render("index");
}
