const express = require('express');
const app = express();
const cacheRoutes = require('./routes/cacheRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

app.use(express.json());
app.use('/api/cache', cacheRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
