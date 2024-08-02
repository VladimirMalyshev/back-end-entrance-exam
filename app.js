const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const axios = require('axios')
const NodeCache = require('node-cache')
const app = express();
const API_URL = 'https://jsonplaceholder.typicode.com/users';
const PORT = process.env.PORT || 3000;
let cache = new NodeCache();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API пример',
      version: '1.0.0',
      description: 'Пример REST API с CRUD-операциями для ресурса "items"',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: `Локальный сервер, использующий порт ${PORT}`,
      },
    ],
  },
  apis: ['./app.js'],
};

const specs = swaggerJsdoc(options);

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 *
 * /:
 *   get:
 *     summary: Проверка работоспособности API
 *     tags:
 *       - Info
 *     responses:
 *       200:
 *         description: Возвращает сообщение о работоспособности API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Добро пожаловать в наше REST API!"
 */
app.get('/', (req, res) => {
  res.json({ message: 'Добро пожаловать в наше REST API!' });
});

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Операции с ресурсом "items"
 */

/**
 * @swagger
 *
 * /items:
 *   get:
 *     summary: Получить список всех элементов
 *     tags:
 *       - Items
 *     responses:
 *       200:
 *         description: Список всех элементов
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 */
app.get('/items', (req, res) => {
  res.json({ items: [] });
});

app.get('/api/users', async (req, res) => {
  const cachedUsers = cache.get('users');
  if (cachedUsers) {
    return res.json(cachedUsers);
  } else {
    try {
      const response = await axios.get(API_URL);
      const users = response.data;
      cache.mset(users);
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
  }
});
/**
 * @swagger
 *
 * /items/{id}:
 *   get:
 *     summary: Получить элемент по ID
 *     tags:
 *       - Items
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Запрашиваемый элемент
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 item:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 */
app.get('/items/:id', (req, res) => {
  res.json({ item: { id: req.params.id } });
});

/**
 * @swagger
 *
 * /items:
 *   post:
 *     summary: Создать новый элемент
 *     tags:
 *       - Items
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *           example: {
 *             "id": 1
 *           }
 *     responses:
 *       201:
 *         description: Созданная запись
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 item:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 */
app.post('/items', (req, res) => {
  res.status(201).json({ item: req.body });
});

app.post('/api/cache/size', (req, res) => {
  const newSize= req.body.size;
  if (newSize && Number.isInteger(newSize) && newSize > 0) {
    cache.close();
    
    cache = new NodeCache({ maxKeys: newSize })
    cache.options.maxKeys = newSize;
    return res.json({ message: `Cache size set to ${newSize}` });
  } else {
    return res.status(400).json({ message: 'Invalid cache size' });
  }
});
/**
 * @swagger
 *
 * /items/{id}:
 *   put:
 *     summary: Обновить элемент по ID
 *     tags:
 *       - Items
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *           example: {
 *             "id": 1
 *           }
 *     responses:
 *       200:
 *         description: Обновленная запись
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 item:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 */
app.put('/items/:id', (req, res) => {
  res.json({ item: { id: req.params.id, ...req.body } });
});

/**
 * @swagger
 *
 * /items/{id}:
 *   delete:
 *     summary: Удалить элемент по ID
 *     tags:
 *       - Items
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Успешное удаление записи
 */
app.delete('/items/:id', (req, res) => {
  res.status(204).end();
});

app.delete('/api/cache', (req, res) => {
  cache.flushAll();
  return res.json({ message: 'Cache cleared' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});