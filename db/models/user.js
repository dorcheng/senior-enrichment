'use strict';
var Sequelize = require('sequelize');
var db = require('../index.js');


module.exports = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isLongEnough: function (name) {
        if (name.length < 1) {
          throw new Error('Please type your entire name');
        }
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});
