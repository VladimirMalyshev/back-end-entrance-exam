const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cache API',
            version: '1.0.0',
            description: 'API for in-memory cache',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;