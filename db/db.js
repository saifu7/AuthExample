const mongoose = require('mongoose');


// connect to database 

const db = mongoose.connect("mongodb://localhost:27017/foodstall", { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${ err.message }`);
    });;

mongoose.Promise = global.Promise;

module.exports = db;