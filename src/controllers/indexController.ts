import type { Request, Response } from "express";
import pool from "../db/pool.js";
import bcrypt from "bcrypt";
import type { UserSignUpBody } from "../types.js";

export const index = async (req: Request, res: Response) => {
    console.log(await pool.query("SELECT * FROM user"))
    res.send("Hello world");
}

export const getSignUp = async (req: Request, res: Response) => {
    res.render("sign-up");
}

export const postSignUp = async (req: Request<{}, {}, UserSignUpBody>, res: Response) => {
    console.log(req.body);
}