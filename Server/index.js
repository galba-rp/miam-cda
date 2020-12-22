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

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


//if environment variable PORT is not set then will use 5000
const port = process.env.PORT || 3000;
app.listen(port);