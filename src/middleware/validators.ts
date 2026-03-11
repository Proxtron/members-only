import type { Meta } from "express-validator";
import type { UserSignUpBody } from "../types.js";
import { getUserCountWithNameCombo } from "../db/user.js";

export const checkUserExistsValidator = async (last_name: string, {req}: Meta) => {
    const { first_name } = req.body as UserSignUpBody;
    const userCountWithNameCombo = await getUserCountWithNameCombo(first_name, last_name);
    if(userCountWithNameCombo > 0) {
        throw new Error("User with this name already exists");
    }
}

export const checkPassAndConfirmPass = (password: string, {req}: Meta) => {
    const { confirm_password } = req.body as UserSignUpBody;
    return confirm_password === password;
}