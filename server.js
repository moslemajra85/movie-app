import dotenv from "dotenv";
dotenv.config();
import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";

connectDB();

const app = express();
app.use(express.json())
app.use("/api/movies", movieRoutes);
app.use("/api/genres", genreRoutes)



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`.bgBlue.bgBlack.bold);
});
