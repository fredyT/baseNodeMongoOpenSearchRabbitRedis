
var MONGODB_URI= process.env.MONGODB_URI || 'mongodb://localhost:27017/emainst';
var MONGODB_POOLSIZE= process.env.MONGODB_POOLSIZE || 50;
var MONGODB_RECONNECTINTERVAL= process.env.MONGODB_RECONNECTINTERVAL || 1000;

module.exports = {
    uri : MONGODB_URI,
    poolsize : MONGODB_POOLSIZE,
    reconnectInterval : MONGODB_RECONNECTINTERVAL
}
