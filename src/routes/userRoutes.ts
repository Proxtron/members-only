import * as userController from "../controllers/userController.js";
import validationResultMiddleware from "../middleware/validationResultMiddleware.js";
import { checkUserExistsValidator, checkPassAndConfirmPass } from "../middleware/validators.js";
import { body } from "express-validator";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/sign-up", userController.getSignUp);
userRouter.post("/sign-up", 
    body("first_name").trim().notEmpty().withMessage("First name is a required field"),
    body("last_name").trim().notEmpty().withMessage("Last name is a required field")
        .custom(checkUserExistsValidator).withMessage("User with first and last name exists already"),
    body("password").trim().notEmpty().withMessage("Password is a required field"),
    body("confirm_password").trim().notEmpty().withMessage("Confirm password is a required field"),
    body("password").custom(checkPassAndConfirmPass).withMessage("Password and confirm password fields are not the same"),
    validationResultMiddleware("sign-up"),
    userController.postSignUp
);

export default userRouter;