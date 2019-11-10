const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const ejs = require('ejs');

const db = require('./db/db');


app.use(morgan('dev'));
app.set('view engine','ejs');


// app.use(bodyParser.urlencoded({ useNewUrlParser: true }));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// upload path
// app.use('/uploads', express.static('uploads'))


// cors 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', '*');
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});


// imports routes
app.get('/', function (req, res) {
    res.render("landing");
});


const userRoutes = require('./routes/user-routes');
app.use('/users', userRoutes);





//error handling
app.use((req, res, next) => {
    const error = new Error('URL not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {

    res.status(error.status || 500);
    res.json({
        message: error.message
    })

});

module.exports = app