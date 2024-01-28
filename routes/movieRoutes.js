const express = require("express");
const router = express.Router();

const movieController = require('../controllers/movieController')

router.get("/", (req, res) => {
  res.send("Bienvenue sur mon exercice d'API réalisée avec Express js et Mongoose")
})

router.get('/movies', movieController.getAllMovies);
router.get('/movie/:title', movieController.getMovieByTitle);
router.post('/add-movie', movieController.addMovie);
router.put('/update-movie/:id', movieController.updateMovie);
router.delete('/delete-movie/:id', movieController.deleteMovie);

module.exports = router;