const express = require('express');
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movieRoutes');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

(async function connectDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/monapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connecté à la base de données MongoDB");
  } catch (err) {
    console.error("Erreur de connexion à la base de données:", err);
  }
})();

const db = mongoose.connection;

db.on('error', (error) => console.error('Erreur de connexion à MongoDB :', error));
db.once('open', () => console.log('Connecté à MongoDB'));


app.use(bodyParser.json());

app.use(movieRoutes);

app.get('*', (req, res) => {
  res.status(404).json({ error: 'Page non trouvée' });
});

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
