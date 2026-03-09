import { validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

const validationResultMiddleware = (view: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req).array().map((error) => error.msg);
        if(errors.length > 0) {
            return res.status(400).render(view, {errors});
        } else {
            next();
        }
    }
}

export default validationResultMiddleware;