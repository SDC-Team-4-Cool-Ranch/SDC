const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
const app = express();


// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());


// HTTP ROUTER
app.use('/api', router)



const PORT = 3000;

// STARTS THE SERVER
app.listen(PORT, function(err) {
  if (err) console.log('error starting server: ', err);
  else console.log(`server listening on port ${PORT}`);
});
