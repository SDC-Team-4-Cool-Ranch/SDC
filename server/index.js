require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
// const path = require('path');

const { LOCAL_URL, PORT } = process.env;
const app = express();

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());


// HTTP ROUTER
app.use('/api', router)


// STARTS THE SERVER
app.listen(PORT, function(err) {
  if (err) console.log('error starting server: ', err);
  else console.log(`server listening at ${LOCAL_URL}:${PORT}`);
});
