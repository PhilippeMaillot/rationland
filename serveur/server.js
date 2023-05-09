const express = require('express') // la récupération d'express
const app = express() // variable utilisant la librairie express
const jeux = require('./test.json')
var cors = require('cors')
const fs = require('fs');
var bodyParser = require('body-parser')
app.use(bodyParser.json());



app.use(cors())


app.get('/jeux', (req, res) => {
  res.status(200).json(jeux)
});

app.get('/jeux/:id', (req,res) => {
  const id = parseInt(req.params.id)
  const leJeux = jeux.find(jeu => jeu.id === id)
  res.status(200).json(leJeux)
})

app.get('/nombrejeux', (req,res)=>{
  res.status(200).json(jeux.length)

})
app.post('/addJeux', (req,res)=>{
  console.log(req.body)
  const newJeux = {  
    "id": req.body.id,
    "name": req.body.name,
    "imageUrl": req.body.imageUrl
};

  fs.readFile('./test.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erreur serveur 1');
    }

    const jeux = JSON.parse(data);

    jeux.push(newJeux);

    const json = JSON.stringify(jeux, null, 2);
    fs.writeFile('./test.json', json, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur 2');
      }

      res.send('Jeux ajouté avec succès');
    });
  });
})

app.put("/modifJeux/:id", (req,res)=>{
  const gameId = req.params.id;
  const { name, imageUrl } = req.body;

  fs.readFile('test.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erreur serveur');
    }

    const jeux = JSON.parse(data);

    // Recherche du jeu par son ID
    const jeu = jeux.find((j) => j.id === parseInt(gameId));

    if (!jeu) {
      return res.status(404).send('Jeu non trouvé');
    }

    // Mise à jour des propriétés du jeu
    jeu.name = name;
    jeu.imageUrl = imageUrl;

    const json = JSON.stringify(jeux, null, 2);

    fs.writeFile('test.json', json, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
      }

      res.send('Jeu modifié avec succès');
    });
  });
})

app.delete('/delJeux/:id', (req, res) => {
  const gameId = req.params.id;

  fs.readFile('test.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erreur serveur');
    }

    let jeux = JSON.parse(data);

    // Recherche du jeu par son ID
    const jeuIndex = jeux.findIndex((j) => j.id === parseInt(gameId));

    if (jeuIndex === -1) {
      return res.status(404).send('Jeu non trouvé');
    }

    // Suppression du jeu du tableau
    jeux.splice(jeuIndex, 1);

    const json = JSON.stringify(jeux, null, 2);

    fs.writeFile('test.json', json, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
      }

      res.send('Jeu supprimé avec succès');
    });
  });
});
app.listen(8000, () => {
  console.log('Server started on port 8000');
});