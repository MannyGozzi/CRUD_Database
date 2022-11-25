const express = require('express')
const app = express()

const portNum = 3001

app.get('/', (req, res)=>{
    res.send('hello world');
});

app.listen(portNum, ()=>{
    console.log('Running on port: ', portNum);
});