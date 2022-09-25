const { createClient } = require('redis');
const { appLogger } = require('../utils/logging');

var redisClient;

const getRedisClient = async () => {
    if (redisClient === null || redisClient === undefined) {
        redisClient = createClient({
            password: 'redispassword'
        });
        redisClient.on('error', (err) => appLogger.error(`Redis-client error! ${err}`))

        await redisClient.connect();
    }
    return redisClient;
}

module.exports = {
    getRedisClient,
}