const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

const indexRoutes = require('./routes/index')

//conecting to db
mongoose.connect('/mongodb://localhost/crud-example')
    .then(db =>console.log('db connected'))
    .catch(err => console.log(err))

//settings
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

//routes
app.use('/', indexRoutes);

//start the server
app.listen(app.get('port'), ()=>{
    console.log('server on port',app.get('port'));
});