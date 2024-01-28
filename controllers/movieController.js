const Movie = require('../models/movie');

const movieController = {

    getAllMovies: async (req, res) => {
        try {
            const movies = await Movie.find();
            if (!movies) {
                return res.status(404).json({ message: "Aucun film" });
            }
            res.json(movies);
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la requête" });
        }
    },

    getMovieByTitle: async (req, res) => {
        try {
            const movie = await Movie.findOne({ title: req.params.title });
            if (!movie) {
                return res.status(404).json({ message: "Aucun film ne correspond à votre recherche" });
            }
            res.json(movie);
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la requête" });
        }
    },

    addMovie: async (req, res) => {
        try {
            const movieData = req.body;
            const movie = new Movie(movieData);
            await movie.save();
            res.status(201).json(movie);
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de l'ajout du film" });
        }
    },

    updateMovie: async (req, res) => {
        try {
            const movieData = req.body;
            const movie = await Movie.findByIdAndUpdate(req.params.id, movieData, { new: true });
            if (!movie) {
                return res.status(404).json({ message: "Aucun film ne correspond à l'id" });
            }
            res.json(movie);
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la mise à jour du film" });
        }
    },

    deleteMovie: async (req, res) => {
        try {
            const movie = await Movie.findByIdAndDelete(req.params.id);
            if (!movie) {
                return res.status(404).json({ message: "Aucun film ne correspond à l'id" });
            }
            res.json({ message: "Film supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la suppression du film" });
        }
    }

}

module.exports = movieController;
