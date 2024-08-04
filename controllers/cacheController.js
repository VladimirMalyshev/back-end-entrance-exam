const cacheService = require('../services/cacheService');
const externalApiService = require('../services/externalApiService')

const getCacheData = async (req, res) => {
    const { key } = req.params;
    let data = cacheService.getCache(key);

    if (data) {
        return res.status(200).json({ data });
    } else {
        try {
            data = await externalApiService.fetchDataFromExternalApi(key);
            cacheService.setCache(key, data); 
            return res.status(200).json({ data });
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching data from external API', error: error.message });
        }
    }
};

const setCacheData = (req, res) => {
    const { key } = req.params;
    const { value, ttl } = req.body;
    cacheService.setCache(key, value, ttl);
    res.status(200).json({ message: 'Data cached successfully' });
};

const clearCacheData = (req, res) => {
    cacheService.clearCache();
    res.status(200).json({ message: 'Cache cleared' });
};

const setCacheSize = (req, res) => {
    const { size } = req.body;
    cacheService.setCacheSize(size);
    res.status(200).json({ message: 'Cache size updated' });
};

module.exports = {
    getCacheData,
    setCacheData,
    clearCacheData,
    setCacheSize,
};
