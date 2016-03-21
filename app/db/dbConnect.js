'use strict';
var mongoose = require('mongoose');
var dbConfig = require('./config/db');

mongoose.connection.on('connected', function() {
  console.log('Successfully connected to DB');
});

mongoose.connection.on('error', function(err) {
  console.error('Failed to connect to DB: ', err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Successfully disconnected from DB');
});

var gracefulExit = function() {
  mongoose.connection.close(function () {
    console.log('Successfully disconnected from DB via app termination');
    process.exit(0);
  });
}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

function connect() {
  try {
    console.log('Attempting to connect to DB');
    mongoose.connect(dbConfig.url);
  } catch (err) {
    console.log('Failed to connect to DB: ' + err.message);
  }
}

module.exports = {
  connect: connect
};
