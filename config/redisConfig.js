const redis = require('redis');
var redisHost = process.env.REDIS_HOST || localhost;
var redisPort = process.env.REDIS_PORT || 6379
const redisClient = redis.createClient({
    host: redisHost,
    port: redisPort
});

module.exports = redisClient;