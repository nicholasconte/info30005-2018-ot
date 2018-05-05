const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');

//Connect to mongoose
mongoose.connect('mongodb://ari:ari@ds259089.mlab.com:59089/onethird')
    .then(() => console.log('MongoDB Connected..'))
    .catch(err => {
        console.log(err)
    });

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))

app.use(flash());

// Global variables
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Load routes
const home = require('./routes/home');
const users = require('./routes/users');
const main = require('./routes/main');


app.set('view engine', 'ejs');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Use routes
app.use('/', home);
app.use('/users', users);
app.use('/main', main);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})