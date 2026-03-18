import type { Request, Response, NextFunction } from "express";

export const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        return res.status(401).send("Unauthorized");
    }
}

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    if(req.user && req.user.admin) {
        next();
    } else {
        return res.status(403).send("Forbidden");
    }
}