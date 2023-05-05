const express = require('express') // la récupération d'express
const app = express() // variable utilisant la librairie express
const jeux = require('./test.json')
var cors = require('cors')
const fs = require('fs');


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

app.listen(8000, () => {
  console.log('Server started on port 8000');
});