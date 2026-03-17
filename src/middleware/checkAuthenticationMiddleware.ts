import type { Request, Response, NextFunction } from "express";

export const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        return res.status(401).send("Unauthorized");
    }
}

export const checkIsMember = () => {

}
