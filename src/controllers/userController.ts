import type { NextFunction, Request, Response } from "express";
import type { UserAddInterface, UserSignUpBody } from "../types.js";
import { addNewUser } from "../db/user.js";
import bcrypt from "bcrypt";

export const getSignUp = async (req: Request, res: Response) => {
    res.render("sign-up");
}

export const postSignUp = async (req: Request<{}, {}, UserSignUpBody>, res: Response, next: NextFunction) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const userToAdd: UserAddInterface = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: hashedPass
        }
        
        await addNewUser(userToAdd);
        res.redirect("/");
    } catch(error) {
        next(error);
    }
}