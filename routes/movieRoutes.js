import express from "express";
import { getAllMovies, createMovie, updateMovie, deleteMovie} from "../controllers/movieController.js";

const router = express.Router();

// /api/movies
router.get("/", getAllMovies);
router.post("/", createMovie);

// /api/movies/neeijifhiehfiehfie44646
router.put("/:id", updateMovie)
router.delete("/:id", deleteMovie)
export default router;
