import { Router } from "express";
import * as indexController from "../controllers/indexController.js"
import { body } from "express-validator";
import validationResultMiddleware from "../middleware/validationResultMiddleware.js";
import checkUserExistsValidator from "../middleware/checkUserExistsValidator.js";

const indexRouter = Router();

indexRouter.get("/", indexController.index);
indexRouter.get("/sign-up", indexController.getSignUp);
indexRouter.post("/sign-up", 
    body("first_name").trim().notEmpty().withMessage("First name is a required field"),
    body("last_name").trim().notEmpty().withMessage("Last name is a required field")
        .custom(checkUserExistsValidator).withMessage("User with first and last name exists already"),
    body("password").trim().notEmpty().withMessage("Password is a required field"),
    body("confirm_password").trim().notEmpty().withMessage("Confirm password is a required field"),
    validationResultMiddleware("sign-up"),
    indexController.postSignUp);

export default indexRouter;