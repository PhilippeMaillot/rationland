const express = require('express')
const app = express()
const data = require('./test.json')

app.get('/', function (req, res) {
    res.json(data)
  })
// post put delete
  
app.listen(8000)