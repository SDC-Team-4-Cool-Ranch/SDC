const express = require('express');
const app = express();
const db = require('./db/mongoSchema.js');




const port = 3000;

// STARTS THE SERVER
app.listen(port, () => console.log(`server listening on port ${port}`));
