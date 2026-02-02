import express from "express"

import { getAllGenres, getGenreById, createGenre, updateGenre, deleteGenre } from "../controllers/genreController.js"


const router = express.Router()


// get: /api/genres
router.get("/", getAllGenres)


//:id     /api/genre/7, /api/genre/nenfenifn
router.get("/:id", getGenreById)



router.post('/', createGenre)


router.put("/:id", updateGenre)


router.delete("/:id", deleteGenre)
export default router
