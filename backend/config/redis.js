const redis = require('redis');

const redisClient = redis.createClient({
  url: 'redis://localhost:6380'
});

redisClient.on('error', (err) => console.error('Redis Error:', err));
redisClient.on('connect', () => console.log(' Redis Connected'));

redisClient.connect();

module.exports = redisClient;