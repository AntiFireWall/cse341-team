const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
})
app.use('/', require('./routes'));

mongodb.initDB((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node is running on port ${port}`);
    });
  }
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});


/* ***********************
* Express Error Handler
* Placed after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  if (err.status) {
    console.error(`Stack: ${err.stack}`);
    console.error(`Status: ${err.status}`);
    console.error(`Message: ${err.message}`);
    res.status(err.status).send({
        status: err.status,
        message: err.message
  });
  } else {
    console.error(`Error at: "${req.originalUrl}": ${err.message}`);
    console.error(`Stack: ${err.stack}`);
    res.status(500).send({
        error: err.message
  });
  }
  
});