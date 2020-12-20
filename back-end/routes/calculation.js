const express = require('express');
const router = express.Router();

router.post('/', (req, res)=>{
    let order = req.body.order
    let day = req.body.day
    console.log(order, day)
     res.send(req.body);
 });

 module.exports = router; 