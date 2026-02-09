import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    dateRented: {
      type: Date,
      default: Date.now,
    },

    dueDate: {
      type: Date,
      default: function () {
        return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      },
    },

    dateReturned: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["active", "returned"],
      default: "active",
    },

    rentalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Rental = mongoose.model("Rental", rentalSchema);

export default Rental;
