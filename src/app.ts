import express from "express";
import "dotenv/config";
import indexRouter from "./routes/indexRoutes.js";
import path from "node:path";
import { Strategy as LocalStrategy} from "passport-local";
import userRouter from "./routes/userRoutes.js";
import type { Request, Response, NextFunction } from "express";
import session from "express-session";
import passport from "passport";
import { getUserWithId, getUserWithNameCombo } from "./db/user.js";
import type { UserAddInterface } from "./types.js";
import bcrypt from "bcrypt";
import flash from "connect-flash";
import connectPgSimple from "connect-pg-simple";
import pool from "./db/pool.js";
import messageRouter from "./routes/messageRoutes.js";
import { checkAuthentication } from "./middleware/checkAuthenticationMiddleware.js";

const app = express();

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

const PgStore = connectPgSimple(session);

app.use(session({
    store: new PgStore({pool: pool}),
    secret: "cats", 
    resave: false, 
    saveUninitialized: false
}));

app.use(passport.session());
app.use(flash());

passport.use(new LocalStrategy({
    usernameField: "first_name",
    passReqToCallback: true
}, async (req, first_name, password, done) =>  {
    try {
        const { last_name } = req.body as UserAddInterface;
        const user = await getUserWithNameCombo(first_name, last_name);

        if(!user) {
            return done(null, false, {message: "Name or password is incorrect"});
        }

        const passwordCorrect = await bcrypt.compare(password, user.password);
        if(!passwordCorrect) {
            return done(null, false, {message: "Name or password is incorrect"});
        }

        return done(null, user);
    } catch(error) {
        done(error);
    }
    

}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await getUserWithId(id)

    if(!user) {
        return done(null, false);
    }

    done(null, user);
  } catch(err) {
    done(err);
  }
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.user = req.user;
    console.clear();
    console.log(req.user);
    console.log(req.session);
    next();
});

//Routers
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/message", checkAuthentication, messageRouter);

//Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).render("error", {message: "Something went wrong"});
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port 3000")
});