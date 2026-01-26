import Movie from "../models/movie.js";

const getAllMovies = async (req, res) => {
  console.log(req);
  try {
    const movies = await Movie.find();

    res.json(movies);
  } catch (error) {
    console.log("Error: ", error);
  }
};
export { getAllMovies };
