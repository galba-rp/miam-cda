const express = require('express');
const app = express();
const cors = require ('cors');
const bodyParser = require('body-parser');

const calcRoute = require('./routes/calculation');



// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/calc', calcRoute);

//if environment variable PORT is not set then will use 3000
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}...`));