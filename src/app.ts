import express from "express";
import "dotenv/config";
import indexRouter from "./routes/indexRoutes.js";
import path from "node:path";

const app = express();

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use("/", indexRouter);

app.listen(PORT, () => {
    console.log("Listening on port 3000")
});