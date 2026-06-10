// const redis = require('redis');

// const redisClient = redis.createClient({
//   url: process.env.REDIS_URL,
//   socket: {
//     tls: true,
//     rejectUnauthorized: false
//   }
// });

// redisClient.on('error', (err) => console.error('Redis Error:', err));
// redisClient.on('connect', () => console.log('✅ Redis Connected'));

// (async () => {
//   await redisClient.connect();
// })();

// module.exports = redisClient;