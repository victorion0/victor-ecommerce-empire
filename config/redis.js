const redis = require('redis');
require('dotenv').config();

// CREATE FAKE REDIS FOR LOCAL DEV
const createFakeRedis = () => ({
  data: new Map(),
  async get(key) {
    return this.data.get(key) || null;
  },
  async set(key, value, mode, duration) {
    this.data.set(key, value);
    return 'OK';
  },
  async del(key) {
    this.data.delete(key);
    return 1;
  },
  async connect() {
    console.log('🚀 Fake Redis ready for local dev – cart go work fast!');
  },
  on(event, callback) {
    if (event === 'error') {
      callback(new Error('Fake Redis – no real connection'));
    }
  },
  quit() {}
});

// REAL REDIS FOR PRODUCTION
let redisClient;

if (process.env.REDIS_URL && process.env.REDIS_URL.includes('upstash')) {
  redisClient = redis.createClient({
    url: process.env.REDIS_URL
  });
  redisClient.on('error', (err) => console.log('Real Redis error:', err.message));
  redisClient.connect().catch(console.error);
} else {
  redisClient = createFakeRedis();
  redisClient.connect();
}

module.exports = redisClient;