const express = require('express');
const router = express.Router();
const cacheController = require('../controllers/cacheController');

router.post('/size', cacheController.setCacheSize);
router.get('/:key', cacheController.getCacheData);
router.post('/:key', cacheController.setCacheData);
router.delete('/', cacheController.clearCacheData);

module.exports = router;
