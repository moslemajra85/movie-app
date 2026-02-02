import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import Movie from "./models/movie.js";
import Genre from "./models/genre.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const movies = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/movies.json`, "utf-8")
);

const genres = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/genres.json`, "utf-8")
);

// Import into DB
const importData = async () => {
    try {
        // Clean DB first
        await Movie.deleteMany();
        await Genre.deleteMany();

        // Import Genres
        const savedGenres = await Genre.insertMany(genres);

        const genreMap = {};
        savedGenres.forEach((g) => {
            genreMap[g.name] = g._id;
        });

        // Map movies to genre IDs
        const moviesWithGenreIds = movies.map((movie) => {
            return { ...movie, genre: genreMap[movie.genre] };
        });

        await Movie.create(moviesWithGenreIds);

        console.log("Data Imported...".green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Movie.deleteMany();
        await Genre.deleteMany();

        console.log("Data Destroyed...".red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
}
