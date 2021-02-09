/* eslint-disable linebreak-style */
const express = require('express');

const app = express();
const cors = require('cors');
const routes = require('./routes');
const APP_CONFIG = require('../config/APIs');
require('../database');

require('dotenv').config();

const corsOptions = {
  origin: process.env.APP_URL,
  optionsSuccessStatus: 200,
  credentials: true,
  exposedHeaders: ['X-Token', 'X-Total-Count', 'X-Per-Page', 'Access-Control-Allow-Credentials'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

app.enable('trust proxy');

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// catch all
app.use((error, req, res) => {
  res.status(error.status || 500);
  console.log('ERROR 500 ----------------------');
  res.json({ error: error.message });
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server started on port 5000');
});
