const NodeCache = require('node-cache');
const cache = new NodeCache();

const getCache = (key) => {
    return cache.get(key);
};

const setCache = (key, value, ttl) => {
    cache.set(key, value, ttl);
};

const clearCache = () => {
    cache.flushAll();
};

const setCacheSize = (size) => {
    cache.options.maxKeys = size;
};

module.exports = {
    getCache,
    setCache,
    clearCache,
    setCacheSize,
};
