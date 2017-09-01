'use strict'
const api = require('express').Router();
const db = require('../db');

api.use('/campuses', require('./routes/campuses'));
api.use('/students', require('./routes/students'));

api.use((req, res, next) => {
  res.status(404).send('Not found');
});

module.exports = api;
