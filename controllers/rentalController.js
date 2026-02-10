import Rental from "../models/rental.js";
import Movie from "../models/movie.js";
import User from "../models/user.js";

export const rentMovie = async (req, res) => {
  try {
    // extract the movie id

    const { movieId } = req.params;

    // extract user id from the request
    // the verify token middleware is gonna give us the user id
    const { userId } = req.user;

    // verify if the movie exists
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res
        .status(404)
        .json({ error: `Movie with id ${movieId} not found.` });
    }

    // check  does this user already have this movie rented
    const existingRental = await Rental.findOne({
      user: userId,
      movie: movieId,
      status: "active",
    });

    if (existingRental) {
      return res
        .status(400)
        .json({ error: "You already have this movie rented" });
    }

    const rental = new Rental({
      user: userId,
      movie: movieId,
      rentalPrice: movie.price,
    });

    const result = await rental.save();

    res.status(201).json({
      message: "Successfully rented the movie",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
