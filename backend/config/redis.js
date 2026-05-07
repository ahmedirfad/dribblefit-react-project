const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.error('Redis Error:', err));
redisClient.on('connect', () => console.log('✅ Redis Connected'));

(async () => {
  await redisClient.connect();

  await redisClient.set("test", "working");
  const val = await redisClient.get("test");
  console.log(val);

})();

module.exports = redisClient;