import express from "express";
import { rentMovie } from "../controllers/rentalController.js";
import { verifyToken } from "../middlewares/auth.js";
const router = express.Router();

// post: /api/rentals/:movieId
router.post("/:movieId", verifyToken, rentMovie);

export default router;
