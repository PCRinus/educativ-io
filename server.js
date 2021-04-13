const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {port, mongoURI} = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const transactionRoute = require('./routes/transactions');
const passport = require('passport');
const session = require('express-session');

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

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

// app.use(
//     session({
//         resave: true,
//         saveUninitialized: true,
//         secret: 'secret key',
//         store: new MongoStore({mongooseConnection: mongoose.connection})
//     })
// )

app.use('/api/transactions', transactionRoute);

app.get('/', (req,res) => {
    res.send('Hello!');
})

app.listen(port, () => {
    console.log('Listening on ' + port);
})