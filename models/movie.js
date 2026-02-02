import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre"
  },

  createAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
