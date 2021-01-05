const express = require('express');
const app = express();
const cors = require ('cors');
const bodyParser = require('body-parser');
const path = require('path'); 
const calcRoute = require('./routes/calculation');



// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/calc', calcRoute);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});




app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


//if environment variable PORT is not set then will use 5000
const port = process.env.PORT || 3000;
app.listen(port);