'use strict';
 
const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
 
app.use(bodyParser.json());
 
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

require('./routes/stockRoute')(app);
 
app.listen(8000, () => {
    console.log("Server running!");
});
