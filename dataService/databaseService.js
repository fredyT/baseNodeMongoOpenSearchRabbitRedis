//By default I believe mongoose has a pool of 100 connections
const mongodbConfig = require('../config/databaseConfig');
console.log('**** mongo uri is ******' + mongodbConfig.uri);
const mongoose = require('mongoose');
//const url = `mongodb://${mongodbConfig.mongoHost}:${mongodbConfig.mongoPort}/${mongodbConfig.database}`;
const url = mongodbConfig.uri;
mongoose.Promise = global.Promise;
mongoose.connect( url );

module.exports = {
    mongoose
};