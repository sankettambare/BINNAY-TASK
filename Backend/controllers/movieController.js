const Movie = require("../models/Movie");

exports.getMovies = async (req, res) => {
  res.json(await Movie.find());
};

exports.addMovie = async (req, res) => {
  await Movie.create(req.body);
  res.json({ message: "Movie added" });
};

exports.deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Movie deleted" });
};
