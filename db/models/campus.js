'use strict';

const Sequelize = require('sequelize');
const db = require('../index.js');

module.exports = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    },
  location: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
});
