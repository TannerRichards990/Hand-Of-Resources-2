const express = require('express');
const path = require('path');
const app = express();

// Built in middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// App routes
app.use('/os', require('./controllers/os'));
app.use('/cars', require('./controllers/cars'));
app.use('/food', require('./controllers/food'));
app.use('/consoles', require('./controllers/consoles'));
app.use('/phones', require('./controllers/phones'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
