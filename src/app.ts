import express from "express";
import "dotenv/config";
import indexRouter from "./routes/indexRoutes.js";
import path from "node:path";
import { Strategy as LocalStrategy, type VerifyFunction} from "passport-local";
import type { IVerifyOptions } from "passport-local";

const app = express();

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

// const verifyFunction: VerifyFunction = (
//     username: string, 
//     password: string, 
//     done: (error: any, user?: Express.User | false, options?: IVerifyOptions) => void
// ) => {

// }
// new LocalStrategy(verifyFunction)



app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port 3000")
});