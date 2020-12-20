const express = require('express');
const app = express();
const cors = require ('cors');
const bodyParser = require('body-parser');

const calcRoute = require('./routes/calculation');



// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/calc', calcRoute);

// app.post('/calc', (req, res)=>{

//     console.log(req.body)
//      res.send(req.body);
//  });


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}...`));