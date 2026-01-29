import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import Movie from "./models/movie.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const movies = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/movies.json`, "utf-8")
);

// Import into DB
const importData = async () => {
    try {
        await Movie.create(movies);

        console.log("Data Imported...".green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Movie.deleteMany();

        console.log("Data Destroyed...".red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
}
