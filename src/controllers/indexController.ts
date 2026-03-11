import type { Request, Response } from "express";
import pool from "../db/pool.js";

export const index = async (req: Request, res: Response) => {
    console.log(await pool.query("SELECT * FROM user"))
    res.send("Hello world");
}
