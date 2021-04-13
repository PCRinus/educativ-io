const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {port, mongoURI} = require('./config');

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("mongodb connected")
}).catch((err) => {
    console.log(err);
    process.exit();
})

app.get('/', (req,res) => {
    res.send('Hello!');
})

app.listen(port, () => {
    console.log('Listening on ' + port);
})