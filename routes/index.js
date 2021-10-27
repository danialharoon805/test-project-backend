const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {
  ErrorCodes
} = require('../constants');

const auth = require('./auth');
const newsPost = require('./newsPost');

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/api/v1/users', auth);
app.use('/api/v1/news-post', newsPost);

app.use((req, res) => {

  res.status(ErrorCodes.NOT_IMPLEMENTED).json({
    success: false,
    message: 'Invalid API'
  });

});

module.exports = app;
