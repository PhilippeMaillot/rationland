const express = require('express') // la récupération d'express
const app = express() // variable utilisant la librairie express
const jeux = require('./test.json')
var cors = require('cors')
app.use(cors())


app.get('/images', (req, res) => {

  res.json(images);
});

app.listen(8000, () => {
  console.log('Server started on port 8000');
});