import Genre from "../models/genre.js";
import { validateGenre } from "../utils/validate.js";

export const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();

    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGenreById = async (req, res) => {
  try {
    // extract the genre id
    const { id } = req.params;

    const genre = await Genre.findById(id);

    if (!genre) {
      return response
        .status(404)
        .json({ message: `Genre with id  ${id} not found` });
    }

    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGenre = async (req, res) => {
  try {
    //validate the genre
    const { error } = validateGenre(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    let genre = new Genre(req.body);

    genre = await genre.save();

    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGenre = async (req, res) => {
  try {
    //exract genre id

    const { id } = req.params;

    // fetch the genre that correspond to the id

    const genre = await Genre.findById(id);

    // check if the genre exist

    if (!genre) {
      return res.status(404).json({ message: `Genre with id ${id} not found` });
    }

    // if it exist we update it

    genre.name = req.body.name;

    // save result
    const result = await genre.save();

    // return the update genre
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGenre = async (req, res) => {
  try {
    const { id } = req.params;

    const genre = await Genre.findById(id);

    if (!genre) {
      return res.status(404).json({ message: `Genre with id ${id} not found` });
    }

    await Genre.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: `Genre with id ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
