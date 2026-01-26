import dotenv from "dotenv";
dotenv.config();
import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";

connectDB();

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`.bgBlue.bgBlack.bold);
});
