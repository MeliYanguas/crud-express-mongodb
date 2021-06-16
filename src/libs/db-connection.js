const mongoose = require('mongoose');

let db;

module.exports = function Connection(){
    if(!db){
       // db = mongoose.connect('/mongodb://localhost/crud-example', {useMongoClient: true})
        db = mongoose.createConnection('mongodb://localhost/crud-example');
    }
    return db;
}