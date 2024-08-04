const express = require('express');
const router = express.Router();
const cacheController = require('../controllers/cacheController');

/**
 * @swagger
 * /cache/{key}:
 *   get:
 *     summary: Get cached data by key
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Cache key (in this case, user ID)
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *       404:
 *         description: Data not found
 *   post:
 *     summary: Set cache data
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Cache key (in this case, user ID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *               ttl:
 *                 type: number
 *     responses:
 *       200:
 *         description: Data cached successfully
 * /cache:
 *   delete:
 *     summary: Clear cache
 *     responses:
 *       200:
 *         description: Cache cleared
 * /cache/size:
 *   post:
 *     summary: Set cache size
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               size:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cache size updated
 */


router.post('/size', cacheController.setCacheSize);
router.get('/:key', cacheController.getCacheData);
router.post('/:key', cacheController.setCacheData);
router.delete('/', cacheController.clearCacheData);

module.exports = router;
