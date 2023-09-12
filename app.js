require('dotenv').config();

const express = require('express');
const path = require('path');
// const multer = require('multer');
const cors = require('cors')

const app = express();
// const upload = multer();


app.use(cors())
// app.use(upload.any());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// import routes 
const userRoutes = require('./routes/stripe.routes');

// define routes 
app.use('/', userRoutes)




module.exports = app
