import dotenv from "dotenv";
dotenv.config();
import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";

connectDB();

const app = express();

app.use("/api/movies", movieRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`.bgBlue.bgBlack.bold);
});
